//为组件添加JSX语法
/*
课程目标：用JSX创建组件的类
    - 创建component 
    - 保证JSX能够正常工作
    - component.id 和组件里的id是不是同一个东西
        - React里 component.id就直接反射到组件的id 
        - HTML用setAttribute component.setAttribute("id","a")

*/

// function createEle(ClsEle, attributes){
//     console.log(arguments)
//  返回两个参数： 1. 如果jsx中的标签是小写则第一个参数字符串
                    // 如果jsx中的标签是大写，babel-preset会编译成函数或者类
                // 2. 第二个参数是 属性和值得键值对
// }

function createEle(ClsEle, attributes){
    //console.log(arguments)
    var o = new Cls()
    for(var name in attributes){
        o[name] = attributes[name];
    }
    return o;
}

class Cls{

}
let component = <Cls id="a"></Cls>
console.log(component)