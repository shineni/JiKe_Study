export let ToyReact = {
    CreateElement(tageName,attributes,...children){
        /*
        思考：如何在javascript中写HTML？
            需要做一系列的DOM操作，将HTML的节点
        核心思想：将JSX变成了单纯的DOM操作，基于实DOM
            1. 创建一个名为tagName的元素
            2. 给该元素添加属性
            3. 如果有子元素，将子元素加到tagName的元素上面去
                3.1 如果子元素是字符串，需要将它转为文本节点
        
        */
    
        let element = document.createElement(tageName);
    
        for(let p in attributes){
            element.setAttribute(p,attributes[p])
        }
    
        for(let child of children){
            if(typeof child ==="string"){
                child = document.createTextNode(child)
            }
            element.appendChild(child)
        }
    
        return element
    }
    
}