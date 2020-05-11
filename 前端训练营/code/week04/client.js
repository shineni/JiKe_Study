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
const client = net.createConnection({
    host:"127.0.0.1",
    port:8088},
    ()=>{
        console.log("connet to server!");
        // 写法1
        //client.write("POST / HTTP/1.1\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 11\r\n\r\nname=Shine\r\n")
        //写法2
        client.write(`
POST / HTTP/1.1\r
Content-Type: application/x-www-form-urlencoded\r
Content-Length: 11\r
\r
name=Shine`);
    });
    client.on("data",(data)=>{
        console.log(data.toString());
        client.end()
    })
    client.on("error",(error)=>{
        console.log(error)
        console.log("disconnected from server")
    })