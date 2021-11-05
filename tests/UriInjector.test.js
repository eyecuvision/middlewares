const protocolConfig = require("./protocolConfig")

const UriInjector = require("./UriInjector")

const nextMock = ()=>{}


describe("Correct URL ",() => {
    
    

    it("with Protocol and IP",()=>{
        
        const url = "127.0.0.1"
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}`
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe("")
            expect(request.body.password).toBe("")
            expect(request.body.port).toBe(protocolConfig[protocol].port)
            expect(request.body.route).toBe(protocolConfig[protocol].route)
        }
        

    })

    it("with Protocol IP slash",()=>{
        
        const url = "127.0.0.1"
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}/`
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe("")
            expect(request.body.password).toBe("")
            expect(request.body.port).toBe(protocolConfig[protocol].port)
            expect(request.body.route).toBe(protocolConfig[protocol].route)
        }
    })

    it("with Protocol IP Username",()=>{
        
        const url = "127.0.0.1"
        const username = "mehmet"
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}/`,
                    username
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe(username)
            expect(request.body.password).toBe("")
            expect(request.body.port).toBe(protocolConfig[protocol].port)
            expect(request.body.route).toBe(protocolConfig[protocol].route)
        }
    })

    it("with Protocol IP Password",()=>{
        
        const url = "127.0.0.1"
        const password = "mehmet1234"
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}/`,
                    password
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe("")
            expect(request.body.password).toBe(password)
            expect(request.body.port).toBe(protocolConfig[protocol].port)
            expect(request.body.route).toBe(protocolConfig[protocol].route)
        }
    })

    it("with Protocol IP Username Password",()=>{
        
        const url = "127.0.0.1"
        const username = "mehmet"
        const password = "mehmet1234"
        

        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}/`,
                    username,
                    password
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe(username)
            expect(request.body.password).toBe(password)
            expect(request.body.port).toBe(protocolConfig[protocol].port)
            expect(request.body.route).toBe(protocolConfig[protocol].route)
        }
    })

    it("with Protocol IP Username Password Port",()=>{
        
        const url = "127.0.0.1"
        const username = "mehmet"
        const password = "mehmet1234"
        const port = 1234
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}:${port}/`,
                    username,
                    password
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe(username)
            expect(request.body.password).toBe(password)
            expect(request.body.port).toBe(port)
            expect(request.body.route).toBe(protocolConfig[protocol].route)
        }
    })


    it("with Protocol IP Username Password Route",()=>{
        
        const url = "127.0.0.1"
        const username = "mehmet"
        const password = "mehmet1234"
        const route = "/euphoria/hell/heaven/combine"
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}${route}`,
                    username,
                    password
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe(username)
            expect(request.body.password).toBe(password)
            expect(request.body.port).toBe(protocolConfig[protocol].port)
            expect(request.body.route).toBe(route)
        }
    })

    it("with Protocol IP Username Password Port Route",()=>{
        const url = "127.0.0.1"
        const port = 1234
        const username = "mehmet"
        const password = "mehmet1234"
        const route = "/euphoria/hell/heaven/combine"
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}:${port}${route}`,
                    username,
                    password
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url)
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe(username)
            expect(request.body.password).toBe(password)
            expect(request.body.port).toBe(port)
            expect(request.body.route).toBe(route)
        }
        
    })


    it("with Protocol IP Username Password Port Route spaces in url",()=>{
        const url = " 127.0.0.1"
        const port = 1234
        const username = "mehmet"
        const password = "mehmet1234"
        const route = "/euphoria/hell/heaven/combine"
        for(let protocol of Object.keys(protocolConfig)){
            const request = {
                body:{
                    address:`${protocol}://${url}:${port}${route}`,
                    username,
                    password
                }
            }
    
            UriInjector(request,{},nextMock)
            
            expect(request.body.address).toBe(url.replaceAll(" ",""))
            expect(request.body.protocol).toBe(protocol)
            expect(request.body.username).toBe(username)
            expect(request.body.password).toBe(password)
            expect(request.body.port).toBe(port)
            expect(request.body.route).toBe(route)
        }
        
    })
})

let resMock


describe("Incorrect URL",() => {
    
    beforeEach(() => {
        jsonMock = jest.fn()
        resMock = {
            json:jsonMock
        } 
    })

    it(" with unavailable protocol.",() => {

        const protocol = "mehmet_emin"
        const url = "127.0.0.1"
        const request = {
            body:{
                address:`${protocol}://${url}`,
            }
        }

        UriInjector(request,resMock,nextMock)
        expect(jsonMock).toHaveBeenCalled()
    })

    it(" with malstructured url",() => {

        const request = {
            body:{
                address:`qw5kjr12j3rwleffjm2k3ro121.wg.wergmerh.;sdgl pl32.41we;rf./`,
            }
        }

        UriInjector(request,resMock,nextMock)
        expect(jsonMock).toHaveBeenCalled()
    })


})