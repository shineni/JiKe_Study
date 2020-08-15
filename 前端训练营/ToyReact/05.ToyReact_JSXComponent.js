       /*
        思考：如何在javascript中写HTML？
            需要做一系列的DOM操作，将HTML的节点
        核心思想：将JSX变成了单纯的DOM操作，基于实DOM
            1. 创建一个名为tagName的元素
            2. 给该元素添加属性
            3. 如果有子元素，将子元素加到tagName的元素上面去
                3.1 如果子元素是字符串，需要将它转为文本节点
        
        */

        /*
        思考：JSX里面的自定义组件机制是什么样子的？
        JSX里面的特殊设定：
            如果名字是小写，是原生的标签名,是一个字符串
            如果名字首字母大写，就认为是一个函数，或者是一个Class
        所以， 如果是自定义的组件，我们是无法将它变成一个真实的DOM元素并被添加进去，所以需要重新定义一个render方法，用于添加自定义的组件
        所以，我们需要对document.createElement的行为进行封装
            - 最终目标： 将自定义的组件以实DOM的形式被添加
                - 添加实DOM，主要需要处理两件事
                    - 1.如何将属性添加进去
                    - 2.如果将子节点添加进去

            - 思路：
                - 对所有的原生的DOM进行封装
                - 创建一个原生的Component让新建的组件继承setAttribute和appendChild方法
            - 详细：
                - 
                - 包装两个方法： appendChild和setAttribute, 需要两个包装类型： 一个是crateElement,一个是createTextNode
                - render方法定义的原因
                - ElementWrapper
                    - 将要创建的实体DOM放到属性上
                        constructor创建root
                        setAttribute的时候代理到Root上面
                - TextWrapper 文本节点是没有属性的
                    - w
        
        */
class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type);
    }
    setAttribute(name, value){
        this.root.setAttribute(name,value)
    }
    //appendChild是component和component之间

    appendChild(component){
        this.root.appendChild(component.root)
    }

}
class TextWrapper{
    constructor(content){
        this.root = document.createTextNode(content);

    }
    //只会被加进去

}

export class Component{
    //constructor的时候不会做任何事情，只会初始化一些变量
    constructor(){
        //但是空对象不够空
        //this.props = {}
        this.props = Object.create(null)
        this.children= [];
        this._root = null;
    }
    //setAttribute是将attributes存起来的
    setAttribute(name, value){
        this.props[name] = value;
    }
    appendChild(component){
        this.children.push(component)
    }
        //*******************注意这个隐藏的api************************
    //ElementWrapper和TextWrapper都是有root的，component的root是需要取出来的
    get root(){
            if(!this._root){
                this._root = this.render().root;
            }
            return this._root;
    }

}

export function render(component, parentElement){
    parentElement.appendChild(component.root)

}
    
export let ToyReact = {
    CreateElement(type,attributes,...children){
        let e;
        /*
        1. 参数type
            - 如果传过来的是字符串，那么就是原生的DOM
            - 否则，则是我们自定的组件
        */
        if(typeof type === "string"){           
            e = new ElementWrapper(type)
        }
        else{
            e = new type;
        }
        //2.
    
        for(let p in attributes){
            e.setAttribute(p,attributes[p])
        }
        //有时候传进来的是一个数组
        let insertChilren = (children) =>{
            for(let child of children){
                if(typeof child ==="string"){
                    child = new TextWrapper(child)
                }

                if((typeof child ==="object")&& (child instanceof Array)){
                    insertChilren(child)
                }else{
                    e.appendChild(child)
                }
                
            }
        }
    
        insertChilren(children)
    
        return e
    }
    
}