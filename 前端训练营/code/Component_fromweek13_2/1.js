
//组件的设计体系
 

class MyComponent{
    constructor(config){
        this.state = {
            i:1
        }
    }
    get prop1(){

    }

    set prop1(){

    }

    mounted(){

    }

    render(){
        
    }

    setAttribute(attr){

    }
    getAttribute(attr,value){

    }

    getChildren(){

    }
    setChildren(){

    }


}
MyComponent.prop1 = 33

let myComponent = <MyComponent attr1 = "33"></MyComponent>

myComponent.attr1 = "333";




//HTML 风格
let myComponent1 = <myComponent1 class = "cls"></myComponent1>
myComponent.className = "444"


//React 等效代码
let myComponent1 = new MyComponent1( ck);
myComponent.class = "333"



//loader和plugins的区别
// loader 是 load一种文件
//plugin 截取webpck的一个步骤，比如拷贝HTML的plugin, 
//loader 也有plugins

//React 的props是等效 config
//React不区分prop 和 attribute