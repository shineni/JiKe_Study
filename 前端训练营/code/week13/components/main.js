/*
 用JSX创建组件类
    1.创建Component 
    2.让组件正常运行
    3.修改组件属性的2个方式
        3.1 ReactJS反射: component.id= "b"
        3.2 HTML setAttribute:

*/



let component = <Cls id = "a"/>   //id是一个attribute
//component.id 与id="a"是否为同一个东西,需要做triggeroff,也就是组件化的理念

//React 利用反射 component.id= "b"

component.setAttribute("id",a)