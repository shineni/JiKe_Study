
const EOF = Symbol("EOF");// EOF: End Of File 文件结束，Symbol都是唯一的

//状态机的初始化代码
function data(c){


}

module.exports.parseHTML = function parseHTML(html){
     let state =  data;
     for(let c of html){
          state = state(c)
     }
     state = state(EOF)
    

}