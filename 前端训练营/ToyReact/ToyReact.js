/*
如何实现虚实DOM的比对
*/
const RENDER_TO_DOM = Symbol("render to dom");
export class Component{
    constructor(){
        this.props = Object.create(null)
        this.children= [];
        this._root = null;
        this._range = null;
        // this._vdom = null;
    }

    setAttribute(name, value){
        this.props[name] = value;
    }

    appendChild(component){
        this.children.push(component);
    }

    //为什么这个render()找不到定义？
    get vdom(){
        return this.render().vdom;
    }


/*
VDOM的比对
1. RENDER_TO_DOM的逻辑，
    - render以后一定要更新，所以要保存当时用的vdom
1. 创建一个update

*/
    [RENDER_TO_DOM](range){
        this._range = range;
        this._vdom = this.vdom;//保存当时的vdom
        this._vdom[RENDER_TO_DOM](range); //重新render得到新的dom

        //replaceContent(range, this.root);
    }
    /*
    只对应对应位置的dom
        - type props, children
        - #text content
         - 对比根节点是否一致
         - 对比children是否一致
    
    */

    update(){
        //比较根节点
        let isSameNode = (oldNode, newNode) => {
            //类型不同
            if(oldNode.type !== newNode.type){
                return false;
            }
            //属性不同
            for(let name in newNode.props){
                if(newNode.props[name] !== oldNode.props[name]){
                    return false;
                }
            }
            //旧的属性比新的属性多
            if(Object.keys(oldNode.props).length > Object.keys(newNode.props).length){
                return false;
            }
            //文本节点的内容
            if(newNode.type === "#text"){
                if(newNode.content !== oldNode.content){
                    return false;
                }
            }
            return true;
        }

        let update = (oldNode, newNode) => {

            if(!isSameNode(oldNode, newNode)){
                //全新渲染：取出oldRange并替换
                newNode[RENDER_TO_DOM](oldNode._range);
                return;
            }
            newNode._range = oldNode._range;

            let newChildren = newNode.vchildren;
            let oldChildren = oldNode.vchildren;

            if(!newChildren || !newChildren.length){
                return;
            }
            let tailRange = oldChildren[oldChildren.length - 1]._range;

            for(let i = 0; i < newChildren.length; i++){
                let newChild = newChildren[i];
                let oldChild = oldChildren[i];
                if(i < oldChildren.length){
                    //递归调用自己
                    update(oldChild, newChild)
                }
                else{
                    //插入的range
                    let range = document.createRange();
                    range.setStart(tailRange.endContainer, tailRange.endOffset);
                    range.setEnd(tailRange.endContainer,tailRange.endOffset);
                    newChild[RENDER_TO_DOM](range);
                    tailRange = range;
                    //TODO
                }
            }
        }

        //备注：为什么_vdom的range不为空，this.vdom的range为空  报错的根源
        let vdom = this.vdom
        update(this._vdom,vdom)
        this._vdom = vdom
    }
    /*
    rerender(){
        //先插入再删除
        let oldRange = this._range;

        let range = document.createRange();
        range.setStart(oldRange.startContainer, oldRange.startOffset);
        range.setEnd(oldRange.startContainer,oldRange.startOffset);
        this[RENDER_TO_DOM](range);

        oldRange.setStart(range.endContainer,range.endOffset)
        oldRange.deleteContents();
    }*/

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
        this.update();
    }
}

function replaceContent(range, node){
    // 先插入后删除
    range.insertNode(node);
    range.setStartAfter(node);
    range.deleteContents();

    range.setStartBefore(node);
    range.setEndAfter(node);
}


class ElementWrapper extends Component{
    constructor(type){
        super(type);//目的是为了调用基类的setAttribute和appendChild
        this.type = type;
        
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
        //如果没有方法就无法实现重绘

        this.vchildren = this.children.map(child => child.vdom)
        return this;
    }

    // 实现所有虚拟DOM到所有实体DOM的更新
    [RENDER_TO_DOM](range){  
        if(range === null)
            console.log("Error");
        this._range = range;   

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
        // 确保vchildren一定存在

        if(!this.vchildren){
            this.vchildren = this.children.map(child => child.vdom);
        }

        //处理children，因为children是一个数组，所以用for of 
        //*** 注意，渲染的时候我们用vchildren去渲染，这样才是真的虚拟DOM树的操作
        for(let child of this.vchildren){
            let childRange = document.createRange();
            childRange.setStart(root, root.childNodes.length);
            childRange.setEnd(root, root.childNodes.length);
            
            child[RENDER_TO_DOM](childRange);
        }

        replaceContent(range, root);
    }
}

class TextWrapper extends Component{
    constructor(content){
        super(content);
        this.type = "#text";
        this.content = content;        
    }
    get vdom(){
        return  this;
    }

    [RENDER_TO_DOM](range){
        this._range = range;
        let root = document.createTextNode(this.content);
        replaceContent(range, root);
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
    // console.log(typeof component);
    // console.log(component instanceof Game);
    // if(typeof component[RENDER_TO_DOM] === "function")
        component[RENDER_TO_DOM](range);
}