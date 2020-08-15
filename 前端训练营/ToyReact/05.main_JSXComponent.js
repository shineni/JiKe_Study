import {ToyReact,render, Component} from "./ToyReact.js"
class MyComponent extends Component{
    render(){
        return <div>
            <h1>MyComponent</h1>
            {this.children}
            
            </div>
    }
}


 let a = <MyComponent id="a" class= "b">
     <span>Hello </span>
     <span>World </span>
     <span>!</span>

 </MyComponent>
 //由于有自定义的组件的存在，所以不可以使用appendChild方法，而是要定义一个render()方法
//document.body.appendChild(a)
render(a,document.body)