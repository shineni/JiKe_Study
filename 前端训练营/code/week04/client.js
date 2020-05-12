const net = require('net')

// net.connect({
//     address:"localhost",
//     port:8088,
//     onread:{
//         buffer:Buffer.alloc(4*1024),
//         callback: function(nread,buf){
//             console.log(buf.toString('utf8',0,nread));
//         }
//     }
// })


// request
/*
POST / HTTP/1.1         //Request line
Host: 127.0.0.1         //headers
Content-Type: application/x-www-form-urlendcoded

field1 = aaa& codez%3D1  //body
*/

class Request{
    /*
        1. 在constructor里面搜集所有信息
            1.1 method 默认值为GET
            1.2 host 
            1.3 port 默认80端口
            1.4 path  默认值是"/""
            1.5 body 默认空对象{}
            1.6 headers 默认空对象{}
            1.7 headers 里面的Content 默认值为application/x-www-form-urlencoded
            1.8【特殊处理:根据Content-Type的类型作出body文字相应的编码】
            1.9 计算Content-Length
        2. 写一个toString()方法，return 一个模板
        3. send()方法，发请求给服务器并返回服务器的结果
        4. 外层创建一个 Request 对象. 用send()方法发送给服务器
    */ 
    constructor(options){
        this.method = options.method || "GET";
        this.host = options.host;
        this.path = options.path || "/";
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }
        if(this.headers["Content-Type"]==="application/json"){
            this.bodyText = JSON.stringify(this.body)
        }
        else if(this.headers["Content-Type"]==="application/x-www-form-urlencoded"){
            //map成一个字符串，字符串模板,产生类似name=“shine”
            this.bodyText = Object.keys(this.body).map(key=> `${key} = ${encodeURIComponent(this.body[key])}`).join('&');       
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }

    toString(){
        return `
${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key=>`${key}:${this.headers[key]}`).join('\r\n')}\r
\r\n${this.bodyText}\r\n\r\n`
    }
    
    
    send(connection){
        return new Promise((resolve,reject)=>{
            if(connection){
                connection.write(this.toString());
            }
            else{
                connection = net.createConnection({
                    host:this.host,
                    port:this.port
                },()=>{
                    connection.write(this.toString());
                })
            }
            connection.on("data",(data)=>{
                resolve(data.toString());
                connection.end()
            })
            connection.on("error",(error)=>{
                reject(error)
                console.log("disconnected from server")
                connection.end()
            })
        })

    }
}

/*

Resonse 的格式：
    HTTP/1.1 200 OK                 //状态行
    Content-Type: text/html
    Date: Mon, 23 Dec 2019 06:46:19 GMT
    Connection: keep-alive
    Transfer-Encoding: chunked       // 上述4行，headers
                                    //空行
        26
        <html><body>Hello World</body></html> 
        
        
        0                                  到0为止

*/ 

class Response{

}

class ResponseParse{
    /*
        负责产生Response 的class，用状态机实现
    */ 
   constructor(){
       this.WATING_STATUS_LINE = 0;
       this.WATING_STATUS_LINE_END = 1;
       this.WATING_HEADER_NAME = 2;
       this.WATING_HEADER_VALUE = 3;
       this.WATING_HEADER_LINE_END = 4;
       this.WATING_HEADER_BLOCK_END = 5;

       this.current = this.WATING_STATUS_LINE;
       this.statusLine = "";
       this.headers = {};
       this.headerName = "";
       this.heaserValue = "";

   }
   
   receive(string){
        for(let i = 0; i<string.length;i++){
            this.receiveChar(string.charAt(i))
        }
   }
   receiveChar(char){
       
   }

}

//IIFE小技巧用void
void async function(){
    let request = new Request({
        method:"POST",
        host:"127.0.0.1",
        path:"/",
        port:"8088",
        headers:{
            ["X-Foo2"]:"customed"
        },
        body:{
            name:"shine"
        }
    })
    
    let response = await request.send();
    console.log(response)

}()



/*
const client = net.createConnection({
    host:"127.0.0.1",
    port:8088},
    ()=>{
        console.log("connet to server!");
        
        let request = new Request({
            method:"POST",
            host:"127.0.0.1",
            path:"/",
            port:"8088",
            headers:{
                ["X-Foo2"]:"customed"
            },
            body:{
                name:"shine"
            }
        })

        console.log(request.toString())
        client.write(request.toString())
        
        // 写法1
        //client.write("POST / HTTP/1.1\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 11\r\n\r\nname=Shine\r\n")
        //写法2
//         client.write(`
// POST / HTTP/1.1\r
// Content-Type: application/x-www-form-urlencoded\r
// Content-Length: 11\r
// \r
// name=Shine`);
     });
    client.on("data",(data)=>{
        console.log(data.toString());
        client.end()
    })
    client.on("error",(error)=>{
        console.log(error)
        console.log("disconnected from server")
    })
*/ 

