const config = require("./protocolConfig")


module.exports = (address,username,password) => {
    address = address.replace(" ","")
    let [protocol,uri] = address.split("://",2)
    let [ipAddr,port = ""] = uri.split(":",2)
    let route 

    if(port == 0){
        [ipAddr,...route] = uri.split("/")
        if(route == 0){
            route = config[protocol].route
        }
        else{
            route = "/" + route.join("/")
        }
        port = config[protocol].port
    }else{
        [port,...route] = port.split("/")
        if(route == 0){
            route = config[protocol].route
        }
        else{
            route = "/" + route.join("/")
        }
    }

return [protocol,username,password,ipAddr,port,route]
}