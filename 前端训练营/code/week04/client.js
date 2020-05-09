const net = require('net');

//
class Request {
  // method, url = host + port + path
  // body: k/v
  // headers

  constructor(options) {
    this.method = options.method || 'GET';
    this.host = options.host;
    this.path = options.path || '/';
    this.port = options.port || 80;
    this.body = options.body || {};
    this.headers = options.headers || {};

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body);
    }

    if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body)
        .map((key) => {
          return `${key}=${encodeURIComponent(this.body[key])}`;
        })
        .join('&');
      this.headers['Content-Length'] = this.bodyText.length;
    }
  }

  toString() {
    return `${this.method} / HTTP/1.1\r\nHost: 127.0.0.1\r\n${Object.keys(
      this.headers,
    )
      .map((key) => `${key}: ${this.headers[key]}`)
      .join('\r\n')}\r\n\r\n${this.bodyText}\r\n\r\n`;
  }

  open(method, url) {}

  send(connection) {
    return new Promise((resolve, reject) => {
        const 
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            console.log('connected to server!');
            connection.write(this.toString());
          },
        );

        connection.on('data', (data) => {
            parser.receive()
        //   new Response(data);
        //   console.log(data.toString());
          connection.end();
        });
        connection.on('end', () => {
          console.log('disconnected from server');
        });
        connection.on('error', (err) => {
          console.log(err);
          connection.end();
        });
      }
    });
  }
}

void (async function () {
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8080',
    body: {
      a: '1',
    },
  });

  await request.send();
})();

//
class Response {

}
class ResponseParser{
    constructor(){
        this.WAITNG_STATUS_LINE = 0;
        this.WAITNG_STATUS_LINE_END = 1;
        this.WAITNG_HEADER_NAME = 2;
        this.WAITNG_HEADER_VALUE = 3;
        this.WAITNG_HEADER_LINE_END = 4;
        this.WAITNG_HEADER_BLOCK_END = 5;
        this.WAITNG_HEADER_SPACE = 6;
        WANNING_BODY = 7;

        this.current = this.WAITNG_STATUS_LINE;
        this.statusLine="";
        this.headers={};
        this.headerName="";
        this.headerValue="";
        this.bodyPaser  = null;
    }
    get isFinished(){
        return this.bodyPaser && this.bodyPaser.isFinished
    }
    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9])+ (\s\S+)/);
        return{
            status
        }
    }

    receive(string){
        for(let i= 0;i<string.length;i++){
            this.receiveChar(string.chatAt(i))
        }
    }
    receiveChar(char){
        if(this.current===this.WAITNG_STATUS_LINE){
            if(char==="\r"){
                this.current = this.WAITNG_STATUS_LINE_END;
            }else{
                this.statusLine+=char;
            }
        }
        else if(this.current===this.WAITNG_STATUS_LINE_END){
            if(char==='\n'){
                this.current = this.WAITNG_HEADER_NAME;
            }
            else{
                this.statusLine += char;
            }
        }
 
        else if(this.current===this.WAITNG_HEADER_NAME){
            if(char===':'){
                this.current = this.WAITNG_HEADER_SPACE;
            }else if(char==='\r'){
                this.current = this.WAITNG_HEADER_BLOCK_END;
                if(this.headers['Transfer-Encoding'==='chuncked']){
                    this.bodyPaser = new TrunkedBodyParser();
                }
                else{
                    this.headerName+=char;
                }
            }
        }
        else if(this.current===this.WAITNG_HEADER_LINE_END){
            if(char=='\n'){
                this.current = this.WAITNG_HEADER_NAME
            }
        }
        else if(this.current = this.WAITNG_HEADER_BLOCK_END)
        {
            if(char=='\n'){
                this.current = this.WANNING_BODY;
            }
        }
        else if (this.current ===this.WANNING_BODY){
            this.bodyPaser.receiveChar(char)
        }
         
            
    }
}

class TrunkedBodyParser{
    constructor(){
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WATING_NEW_LINE = 3;
        this.WATING_NEW_LINE_END = 4;

        this.leftLength = 0;
        this.content = [];
        this.isFinish = false;
        this.current = this.WAITING_LENGTH;

    }
    receiveChar(char){
        // console.log(JSON.stringify(char))
        if(this.current ===this.WAITING_LENGTH){
            if(char==='\r'){
                if(this.length===0){
                    this.isFinish = true;
                }
                this.current = this.WAITNG_STATUS_LINE_END;
            }else{
                this.length *= 10;
                this.length +=char.charCodeAt(0) = '0'.charCodeAt(0);
            }
        }
        else if(this.current ===this.WAITING_LENGTH_LINE_END){
            if(char==='\n'){
                this.current = this.READING_TRUNK;
            }
        }
        else if(this.current ===this.READING_TRUNK){
            this.content.push(char);
            this.length--;
            if(this.length===0){
                this.current = this.WATING_NEW_LINE;
            }
        }
        else if(this.current ===this.WATING_NEW_LINE){
            if(char==='\r'){
                this.current = this.WATING_NEW_LINE_END;
            } 
        }
        else if (this.current = this.WATING_NEW_LINE_END){
            if(char==='\n'){
                this.current = this.READING_TRUNK;
            }
        }

    }

}
