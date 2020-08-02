const css = require('css');

let currentToken = null;
let currentAttribute = null;

let stack = [{type:"document", children:[]}]
let currentTextNode = null;

let rules = []

function computeCSS(element){
     console.log(rules);
     console.log("compute CSS for Element", element)
}

function addCSSRules(text){
     var ast = css.parse(text);
     console.log(JSON.stringify(ast,null,"    "))
     rules.push(...ast.stylesheet.rules)
}

function emit(token){
     let top = stack[stack.length -1];
     if(token.type =="startTag"){
          let element = {
               type:"element",
               children:[],
               attributes:[]
          };

          element.tagName = token.tagName;

          for(let p in token){
               if(p!="type"&& p!="tagName"){
                    element.attributes.push({
                         name:p,
                         value:token[p]
                    })
               }
          }

          computeCSS(element)
          top.children.push(element);
          element.parent = top;
          if(!token.isSelfClosing){
               stack.push(element)
          }
          currentTextNode = null;
     }else if(token.type =="endTag"){
          if(top.tagName != token.tagName){
               throw new Error("Tag start end doesn't match!")
          }else{
               if(top.tagName ==="style"){
                    addCSSRules(top.children[0].content)
               }
               stack.pop();
          }
          currentTextNode = null;
     }
     else if(token.type =="text"){
          if(currentTextNode == null){
               currentTextNode = {
                    type:"text",
                    content:""
               }
               top.children.push(currentTextNode)
          }
          currentTextNode.content += token.content;
     }
}

const EOF = Symbol("EOF");// EOF: End Of File 文件结束，Symbol都是唯一的

//状态机的初始化方法
function data(c){
     if(c=="<"){
          return tagOpen;
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

function tagOpen(c){
     if (c=="/"){
          return endTagOpen;
     }else if(c.match(/^[a-zA-Z]$/)){
          currentToken = {
               type: "startTag",
               tagName:""
          }
          return tagName(c);
     }else{
          emit({
               type:"text",
               content:c
          })
          return ;
     }
}

function endTagOpen(c){
     if(c.match(/^[a-zA-Z]$/)){
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
     else if(c.match(/^[A-Z]$/)){
          currentToken.tagName += c;
          return tagName;
     }
     else if(c==">"){
          emit(currentToken)
          return data;
     }else{
          currentToken.tagName += c;
          return tagName;
     }
}

function beforeAttributeName(c){
     if(c.match(/^[\t\n\f ]$/)){
          return beforeAttributeName;
     }
     else if(c==">"||c=="/"||c==EOF){
          return afterAttributeName(c);
     }
     else if(c=="="){
         
     }
     else{
          currentAttribute = {
               name:"",
               value:""
          }
          return attributeName(c)
     }
}

function attributeName(c){
     if(c.match(/^[\t\n\f ]$/)||c=="/"||c==">"||c==EOF){
          return afterAttributeName(c);
     }else if(c=="="){
          return beforeAttributeValue;
     }else if(c=="\u0000"){

     }else if(c=="\""||c=="'"||c=="<"){

     }else{
          currentAttribute.name += c;
          return attributeName;
     }
}

function beforeAttributeValue(c){
     if(c.match(/^[\t\n\f]$/)||c=="/"||c==">"||c==EOF){
          return beforeAttributeValue;
     }
     else if(c=="\""){
          return doubleQuotedAttributeValue;
     }
     else if(c=="\'"){
          return singleQuotedAttributeValue;
     }
     else if(c==">"){
     
     }
     else{
          return UnQuotedAttributeValue(c)
     }
}

function doubleQuotedAttributeValue(c){
     if(c=="\""){
          currentToken[currentAttribute.name] = currentAttribute.value;
          return afterQuotedAttributeValue;
     }else if(c=="\u0000"){

     }else if(c==EOF){

     }else{
          currentAttribute.value +=c;
          return doubleQuotedAttributeValue
     }
}

function singleQuotedAttributeValue(c){
     if(c=="\'"){
          currentToken[currentAttribute.name] = currentAttribute.value;
          return afterQuotedAttributeValue;
     }else if(c=="\u0000"){

     }else if(c==EOF){

     }else{
          currentAttribute.value +=c;
          return doubleQuotedAttributeValue
     }
}

function afterQuotedAttributeValue(c){
     if(c.match(/^[\t\n\f ]$/)){
          return beforeAttributeName;
     }else if(c=="/"){
          return selfClosingStartTag;
     }else if(c==">"){
          currentToken[currentAttribute.name] = currentAttribute.value;
          emit(currentToken);
          return data;
     }else if(c==EOF){

     }
     else{
          currentAttribute.value +=c;
          return doubleQuotedAttributeValue
     }
}
function UnQuotedAttributeValue(c){
     if(c.match(/^[\t\n\f ]$/)){
          currentToken[currentAttribute.name] = currentAttribute.value;
          return beforeAttributeName;
     }else if(c=="/"){
          currentToken[currentAttribute.name] = currentAttribute.value;
          return selfClosingStartTag;
     }else if(c==">"){
          currentToken[currentAttribute.name] = currentAttribute.value;
          emit(currentToken);
          return data;
     }else if(c=="\u0000"){

     }else if(c=="\""||c=="'"||c=="<"||c=="="||c=="`"){

     }
     else if(c==EOF){

     }
     else{
          currentAttribute.value +=c;
          return UnQuotedAttributeValue
     }    
}

function selfClosingStartTag(c){
     if(c==">"){
          currentToken.isSelfClosing = true;
          emit(currentToken)
          return data;
     }
     else if(c =="EOF"){

     }else{
          
     }
}

function afterAttributeName(c){
     if(c.match(/^[\t\n\f ]$/)){
          return afterAttributeName
     }else if(c=="/"){
          return selfClosingStartTag;
     }else if(c=="="){
          return beforeAttributeValue
     }else if(c==">"){
          currentToken[currentAttribute.name] = currentAttribute.value;
          emit(currentToken);
          return data;
     }else if(c==EOF){

     }else{
          currentToken[currentAttribute.name] = currentAttribute.value;
          currentAttribute = {
               name:"",
               value:""
          };
          return attributeName(c)
     }
}

module.exports.parseHTML = function parseHTML(html){
     let state =  data;
     for(let c of html){
          state = state(c);
     }
     state = state(EOF);
    
     console.log(stack[0])
}