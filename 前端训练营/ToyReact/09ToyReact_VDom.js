
/*
    创建虚拟DOM
    1. 去掉所有的this.root的代理能力
    2. 创建虚拟DOM
        - 创建一个方法：get vdom(){}
            - type
            - props 
            - children(组件的children，我们需要变成vdom的children)

            

*/

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

const RENDER_TO_DOM = Symbol("render to dom");

class ElementWrapper extends Component{
    constructor(type){
        super(type);//目的是为了调用基类的setAttribute和appendChild
        this.type = type;
        //this.root = document.createElement(type);
    }
/*
    setAttribute(name, value){
        //正则小技巧[\s\S]互补的一个是所有空白，一个是所有的非空白，从而达到表示所有的字符的目的
        //根据名字过滤，如果以on开头的那么就是绑定时间，否则设置属性
        if(name.match(/^on([\s\S]+)$/)) {
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/,c => c.toLowerCase()), value);
        }
        else{
            if(name === "className"){
                this.root.setAttribute("class",value);
            }else{
                this.root.setAttribute(name,value);
            }
        }
    }

    appendChild(component){
        //创建Range,渲染component 
        let range = document.createRange();
        range.setStart(this.root, this.root.childNodes.length);
        range.setEnd(this.root,this.root.childNodes.length);
        
        component[RENDER_TO_DOM](range);
    }
    */
    get vdom(){
        return {
            type: this.type,
            props: this.props,
            children: this.children.map(child=>child.vdom)
        }
    }

    [RENDER_TO_DOM](range){
        range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper extends Component{
    constructor(content){
        super(content);
        this.type = "#text";
        this.content = content;
        //this.root = document.createTextNode(content);
    }
    get vdom(){
        return {
            type: this.type,
            content: this.content
        }
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
                console.log(typeof child);
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
    component[RENDER_TO_DOM](range);
}