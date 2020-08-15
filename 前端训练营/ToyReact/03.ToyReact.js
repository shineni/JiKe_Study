//因为main.js中的MyComponent的render的元素不适合写if和else,所以需要给CreateElement 设置一个Wrapper 统一管理操作

//抽象方法 ElementWrapper
class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type)
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value)
    }
    appendChild(vchild){
        vchild.mountTo(this.root)
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}
//抽象方法 TextWrapper
class TextWrapper{
    constructor(type){
        this.root = document.createTextNode(type)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}


export let ToyReact = {
    CreateElement(type,attributes,...children ){
        let element;
        if(typeof type === "string"){
            element = new ElementWrapper(type);
        }
       else{
           element = new type;
       }
       
       for(let name in attributes){

           element.setAttribute(name,attributes[name])
       }
       
       for(let child of children){
           //如果是字符串，那就创建一个文本节点
        if(typeof child == "string"){
            child = new TextWrapper(child)
        }
        debugger;
           element.appendChild(child)
       }

       let insertChildren = (children)=>{
           for(let child of children){

               if(typeof child === "object" && child instanceof Array){
                insertChildren(child)
               }else{
                    if(!child instanceof Component
                        && !(child instanceof ElementWrapper)
                        && !(child instanceof TextWrapper))
                    {
                        child = String(child);
                    }
                    if(typeof child =="string"){
                        child = new TextWrapper(child)
                    }
                   element.appendChild(child)
               }
           }
           insertChildren(children)
       }
       return element;
    },
    render(vdom,element){
        //如果都是实的DOM
        //element.appendChild(vdom)
        vdom.mountTo(element)
    }
}

export class Component {
    constructor(){
        this.children = [];
    }
    setAttribute(name, value){
        this[name] = value;
    }
    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent);

    }
    appendChild(vchild){
        this.children.push(vchild)
    }
}