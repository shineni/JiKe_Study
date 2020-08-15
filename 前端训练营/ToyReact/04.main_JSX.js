import {ToyReact} from "./ToyReact.js"
for(let i in [1,2,3]){
    console.log(i)
}

// function CreateElement(tageName,attributes,...children){
//     //1. 创建一个名为tagName的元素
//     //2. 给该元素添加属性
//     //3. 如果有子元素，将子元素加到tagName的元素上面去
//         //3.1 如果子元素是字符串，需要将它转为文本节点

//     let element = document.createElement(tageName);

//     for(let p in attributes){
//         element.setAttribute(p,attributes[p])
//     }

//     for(let child of children){
//         element.appendChild(child)
//     }

//     return element



    
// }



 let a = <div id="a" class= "b">
     <span>Hello </span>
     <span>World </span>
     <span>!</span>

 </div>
 document.body.appendChild(a)