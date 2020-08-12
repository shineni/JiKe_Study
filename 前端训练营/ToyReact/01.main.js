import {ToyReact} from './ToyReact.js'

class MyComponent{

}
// require("./lib.js")

// for(let i of [1,2,3]){
//     console.log(i)
// }
//翻译前
let a  = <MyComponent name ="a"/>
//翻译后
// var a = ToyReact.CreateElement(MyComponent, {
//     name: "a"
//   });


console.log("Hello Toy React")