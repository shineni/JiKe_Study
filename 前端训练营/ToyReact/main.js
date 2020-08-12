import {ToyReact,Component} from './ToyReact.js'
//问题：
//1.出现ReactDOM.render的原因是JSX 可以是小写的div也可以是自定义的MyComponent的混合体
// 2.不论怎么做也无法实现document.body.appendChild(a);
//解决方案：
//1.在创建MyComponent的实例的时候
//2.render的时候将虚拟DOM变成真实的DOM

class MyComponent extends Component{

    render(){
        return <div>
            <span>Hello </span>
            <span>World</span>
            <span>!</span>
            <div>
                {this.children}
            </div>

            </div>
    }
    setAttribute(name, value){
        this[name] = value;
    }
    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent);

    }

}

let  a = <MyComponent name="a" id="idea"></MyComponent>

//document.body.appendChild(a);
ToyReact.render(a,document.body)