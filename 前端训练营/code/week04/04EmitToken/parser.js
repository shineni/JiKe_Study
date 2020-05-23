let currentToken = null;

function emit(token){
     console.log(token)
}

const EOF = Symbol("EOF");// EOF: End Of File 文件结束，Symbol都是唯一的

//状态机的初始化方法
function data(c){
     if(c=="<"){
          return tageOpen;
     }else if(c == EOF){
          emit({
               type:"EOF"
          })
          return ;
     }else{
          emit({
               type:"text",
               content:c 
          })
          return data;  
     }

}

function tageOpen(c){
     if (c=="/"){
          return endTagOpen;
     }else if(c.match(/^[a-zA-Z]$/)){
          currentToken = {
               type: "startTag",
               tagName:""
          }
          return tagName(c);
     }else{
          return ;
     }
}

function endTagOpen(c){
     if(c.match(/^match[^a-zA-Z]$/)){
          currentToken ={
               type:"endTag",
               tagName:""
          }
          return tagName(c)
     }
     else if(c==">"){

     }else if(c==EOF){
          
     }else{

     }
}

function tagName(c){
     if(c.match(/^[\t\n\f ]$/)){
          return beforeAttributeName;
     }
     else if(c=="/"){
          return selfClosingStartTag;
     }
     else if(c.match(/^[a-zA-Z]$/)){
     currentToken.tagName += c;
          return tagName;
     }
     else if(c==">"){
          emit(currentToken)
          return data;
     }else{
          return tagName;
     }
}

function beforeAttributeName(c){
     if(c.match(/^[\t\n\f ]$/)){
          return beforeAttributeName;
     }
     else if(c==">"){
          return data;
     }
     else if(c=="="){
          return beforeAttributeName;
     }
     else{
          return beforeAttributeName
     }
}

function selfClosingStartTag(c){
     if(c==">"){
          currentToken.isSelfClosing = true;
          return data;
     }
     else if(c =="EOF"){

     }else{
          
     }
}

module.exports.parseHTML = function parseHTML(html){
     let state =  data;
     for(let c of html){
          state = state(c);
     }
     state = state(EOF);
    

}