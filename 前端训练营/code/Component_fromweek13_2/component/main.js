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

//creteEle是组件体系对外的一个接口
function createElement(type, attributes,...children){
    //注意： 当没有属性的时候，传进去的是null而不是空对象
    //console.log(arguments)

    var o = new type;
    for(let name in attributes){
        o.setAttribute(name,attributes[name]);
    }

    for( let child of children ){

    }
    return o;
}

class Parent{
    //让属性触发一些事情
    set class(v){
        console.log("Parent::class", v)
    }

}

class Children{

}

let component = <Parent id="a" class="b">
    <Children></Children>
    <Children></Children>
    <Children></Children>

</Parent>

//翻译后 JSX 构建树的顺序是：先子后父
// var component = createEle(
//     Parent, 
//     {
//         id: "a",
//         "class": "b"
//      }, 
//      createEle(Children, null), 
//      createEle(Children, null), 
//      createEle(Children, null)
//      );

console.log(component)