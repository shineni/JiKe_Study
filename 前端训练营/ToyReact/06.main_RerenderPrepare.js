import {ToyReact,render, Component} from "./ToyReact.js"
class MyComponent extends Component{
    constructor(){
        super();//调用基类的构造函数
        this.state = {
            a:1,
            b:3
        }
    }
    render(){
        return <div>
            <h1>MyComponent</h1>
            <span>{this.state.a.toString()}</span>
            {this.children}
            
            </div>
    }   
}


 let a = <MyComponent id="a" class= "b">
     <span>Hello </span>
     <span>World </span>
     <span>!</span> 

 </MyComponent>

 a.setAttribute("a",1)
 console.log(a.getAttribute("a"));


render(a,document.body)

