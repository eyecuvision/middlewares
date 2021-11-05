const getUrlFromUriUnamePass = require("./getUrlFromUriUnamePass")

module.exports = (req,res,next) => {

    try{
        

        const {address,username = "",password=""} = req.body
        const [protocol,,,ipAddr,port,route] = getUrlFromUriUnamePass(address,username,password)

    
        req.body.address = ipAddr
        req.body.protocol = protocol
        req.body.username = username
        req.body.password = password
        req.body.port = parseInt(port)
        req.body.route = route
    
        next()
    }catch(err){

        return res.json({
            success:false,
            payload:"INVALID_URI"
        })
    }
    
   
}