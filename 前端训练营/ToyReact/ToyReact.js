/*
react里认为：
- 完整的UI= 模版 + 数据

- 更改UI的本质是对数据的更改，再重新使用render函数

解决的主要问题：
    1. 数据来源
    2. 如何实现数据更新机制
主要任务：
    1.如何修改Component类和Wrapper,使得自定义的组件支持state机制

概念：
    1. state
        - 就是一个普通的对象，对象存着一些数据，没有函数，
    2. setState
        - 不但改变了state这个值本身，而且会启动重新render的动作
        - 如果多次setstate则会在整个生命周期结束的时候，发起一次重新render，这次render以后，组件就按照正确的模板写了
        - 组件是如何更新的（难点）
实现：
    1.组件如何实现更新？
        - 组件一定是在render这个环节知道如何更新的，Component取root得过程实际上就是真实渲染的过程
        - RENDER_TO_DOM 就有了重新渲染的功能
            - 挂载到某个位置，使用Range API
        - 重新绘制的渲染能力
            - 需要用一个变量将range保存起来
            - 需要写一个重新渲染的函数
                - 删除range, 重新添加
                    - 案例：每次让state加1，然后重新render
        - setState
            - 实际上setState中 this.state.a++; this.rerender()这两句是合二为一的操作
            -  不同点： 
                - 实现对象的合并，就是把旧的state和新的state合并，不会把旧的完全替换掉
                - rerender是不需要去手工调用的

        【正则小技巧】
        【typeof的坑】 在判断对象的时候一定要联合null 一起判断，因为null返回的也是object


        */

//Symbol是不需要new的

const RENDER_TO_DOM = Symbol("render to dom");

class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type);
    }

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
    [RENDER_TO_DOM](range){
        range.deleteContents();
        range.insertNode(this.root);
    }
}

class TextWrapper{
    constructor(content){
        this.root = document.createTextNode(content);
    }
    [RENDER_TO_DOM](range){
        range.deleteContents();
        range.insertNode(this.root);
    }
}

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
    //在没有private field之前最好的解决方案
    //如果是字符串的时候，不论是class还是object,都可以用[]代替这个名字，来表示里面是一个变量，从而达到不太容易被访问到的目的
    [RENDER_TO_DOM](range){
        this._range = range
        this.render()[RENDER_TO_DOM](range);
    }

    rerender(){
        let oldRange = this._range;
        let range = document.createRange();
        range.setStart(oldRange.startContainer, oldRange.startOffset);
        range.setEnd(oldRange.startContainer,oldRange.startContainer);
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