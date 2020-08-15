import {ToyReact} from './ToyReact.js'

let  a = <div name="a" id="idea">
    <span>Hello </span>
    <span>World </span>
    <span>!</span>



</div>

/*
参数： type, attributes, children
var a = ToyReact.CreateElement("div", {
  name: "a",
  id: "idea"
}, 
ToyReact.CreateElement("span", null, "Hello "), 
ToyReact.CreateElement("span", null, "World "), 
ToyReact.CreateElement("span", null, "!"));
document.body.appendChild(a);
*/
document.body.appendChild(a);