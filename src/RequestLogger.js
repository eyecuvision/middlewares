
const {createRollingFileLogger} = require("simple-node-logger")

const RequestLogger = (options = {}) => {


    const finalOptions = Object.assign({
        errorEventName:'error',
            logDirectory:'logs', // NOTE: folder must exist and be writable...
            fileNamePattern:'roll-<DATE>.log',
            dateFormat:'YYYY.MM.DD'
    },options)
    logger = createRollingFileLogger(finalOptions)
    const inner = (request,response,next) => {
        const requestStart = Date.now();

        let body = [];
        let requestErrorMessage = null;

        const getChunk = chunk => body.push(chunk);
        const assembleBody = () => {
            body = Buffer.concat(body).toString();
        };
        const getError = error => {
            requestErrorMessage = error.message;
        };
        request.on("data", getChunk);
        request.on("end", assembleBody);
        request.on("error", getError);
        
        const prepareLog = (request, response, errorMessage) => {
            const { rawHeaders, httpVersion, method, socket, url } = request;
            const { remoteAddress, remoteFamily } = socket;
        
            const { statusCode, statusMessage } = response;
            const headers = response.getHeaders();

            return(
                JSON.stringify({
                timestamp: Date.now(),
                processingTime: Date.now() - requestStart,
                rawHeaders,
                body,
                errorMessage,
                httpVersion,
                method,
                remoteAddress,
                remoteFamily,
                url,
                response: {
                    statusCode,
                    statusMessage,
                    headers
                }
                })
            );
        }

        const logClose = () => {

            try{
                removeHandlers()
                const message = prepareLog(request,response,"Client aborted")
                logger.info(message)
                console.info(message)
            }catch(err){
                console.error(err)
            }
            
        };
        const logError = error => {
            try{
                removeHandlers()
                const message = prepareLog(request,response,error.message)
                logger.info(message)
                console.info(message)
            }catch(err){
                console.error(err)
            }
            

        };
        const logFinish = () => {
            try{
                removeHandlers()
            const message = prepareLog(request,response,requestErrorMessage)
            logger.info(message)
            console.info(message)
            }catch(err){
                console.error(err)
            }
            
        };
        response.on("close", logClose);
        response.on("error", logError);
        response.on("finish", logFinish);

        const removeHandlers = () => {
            request.off("data", getChunk);
            request.off("end", assembleBody);
            request.off("error", getError);
            response.off("close", logClose);
            response.off("error", logError);
            response.off("finish", logFinish);
        };
        next()
    }
    return inner

}



module.exports = RequestLogger