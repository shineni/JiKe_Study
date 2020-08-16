
/*
    整合虚拟DOM和实DOM
    1. 去掉所有的root,现在是基于VDom做事
   

            

*/
const RENDER_TO_DOM = Symbol("render to dom");
export class Component{
    constructor(){
        this.props = Object.create(null)
        this.children= [];
        //用下划线表示私有
        this._root = null;
        this._range = null;
        //this.state = null;
    }

    setAttribute(name, value){
        this.props[name] = value;
    }

    appendChild(component){
        this.children.push(component);
    }

    get vdom(){
        //递归调用到最终是ElementWrapper 或者 TextWrapper
        return this.render().vdom;
    }

    //将组件的children变成vchildren
    get vchildren(){
        return this.children.map(child => child.vdom)
    }
    //在没有private field之前最好的解决方案
    //如果是字符串的时候，不论是class还是object,都可以用[]代替这个名字，来表示里面是一个变量，从而达到不太容易被访问到的目的
    [RENDER_TO_DOM](range){
        this._range = range
        this.render()[RENDER_TO_DOM](range);
    }

    rerender(){
        //先插入再删除
        let oldRange = this._range;

        let range = document.createRange();
        range.setStart(oldRange.startContainer, oldRange.startOffset);
        range.setEnd(oldRange.startContainer,oldRange.startOffset);
        this[RENDER_TO_DOM](range);

        oldRange.setStart(range.endContainer,range.endOffset)
        oldRange.deleteContents();
    }

    setState(newState){
        if(this.state === null || typeof this.state !== "object"){
            this.state =  newState;
            this.rerender();
            return;
        }

        let merge = (oldState, newState) => {
            for(let p in newState){
                if(oldState[p] === null || typeof oldState[p] !== "object"){
                    oldState[p] = newState[p];
                }
                else{
                    merge(oldState[p],newState[p])
                }
            }
        }

        merge(this.state, newState);
        this.rerender();
    }
}



class ElementWrapper extends Component{
    constructor(type){
        super(type);//目的是为了调用基类的setAttribute和appendChild
        this.type = type;
        
    }

    get vdom(){
        //如果没有方法就无法实现重绘
        return this;
    }

    // 实现所有虚拟DOM到所有实体DOM的更新
    [RENDER_TO_DOM](range){
        range.deleteContents();
        
        let root = document.createElement(this.type);
        //访问对象的属性，所以要用for in 
        for(let name in this.props){
            let value = this.props[name]
            if(name.match(/^on([\s\S]+)$/)) {
                root.addEventListener(RegExp.$1.replace(/^[\s\S]/,c => c.toLowerCase()), value);
            }
            else{
                if(name === "className"){
                    root.setAttribute("class",value);
                }else{
                    root.setAttribute(name,value);
                }
            }
        }

        //处理children，因为children是一个数组，所以用for of 
        for(let child of this.children){
            let childRange = document.createRange();
            childRange.setStart(root, root.childNodes.length);
            childRange.setEnd(root, root.childNodes.length);
            
            child[RENDER_TO_DOM](childRange);
        }

        range.insertNode(root);
    }
}

class TextWrapper extends Component{
    constructor(content){
        super(content);
        this.type = "#text";
        this.content = content;
        this.root = document.createTextNode(content);
    }
    get vdom(){
        return  this;
    }


    [RENDER_TO_DOM](range){
        range.deleteContents();
         range.insertNode(this.root);
    }
}


    
export function createElement(type,attributes,...children){
    let e;

    if(typeof type === "string"){        
        e = new ElementWrapper(type);
    }
    else{
        e = new type;
    }

    for(let p in attributes){
        e.setAttribute(p,attributes[p])
    }               

    let insertChilren = (children) =>{
        for(let child of children){
            // console.log(typeof child);
            if(typeof child === "string"){
                child = new TextWrapper(child)
            }
            if(child === null){
                continue;
            }

            if((typeof child === "object") && (child instanceof Array)){
                insertChilren(child)
            } else {
                if(e instanceof ElementWrapper)   
                    e.appendChild(child);
            }
        }
    }

    insertChilren(children)

    return e
}

export function render(component,parentElement){
    let range = document.createRange();
    range.setStart(parentElement, 0);
    range.setEnd(parentElement,parentElement.childNodes.length);
    range.deleteContents();
    console.log("*******");
    console.log(typeof component[RENDER_TO_DOM]);
    // console.log(typeof component);
    // console.log(component instanceof Game);
    // if(typeof component[RENDER_TO_DOM] === "function")
        component[RENDER_TO_DOM](range);
}