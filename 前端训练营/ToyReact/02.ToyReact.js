

export let ToyReact = {
    CreateElement(type,attributes,...children ){
        console.log(arguments)
       debugger; 

       //【todo: let in and let of】
       let  element = document.createElement(type);
       for(let name in attributes){

           element.setAttribute(name,attributes[name])
       }
       
       for(let child of children){
           //如果是字符串，那就创建一个文本节点
        if(typeof child == "string"){
            child = document.createTextNode(child)
        }
        debugger;
           element.appendChild(child)
       }
       return element;
    }
}