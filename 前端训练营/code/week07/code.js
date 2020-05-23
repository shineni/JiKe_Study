// var list = document.getElementById("container").children;
// var result = [];
// for(let li of list){
//     if(li.getAttribute('data-tag').match(/CSS/)){
//         result.push({
//             name: li.children[1].innerText,
//             url: li.children[1].children[0].href,
//         })
//     }
//     // console.log(li.children[1].innerText)
// }

// var lis = document.getElementById("container").children

// var result = [];

// for(let li of lis) {
//     if(li.getAttribute('data-tag').match(/css/))
//         result.push({
//             name:li.children[1].innerText,
//             url:li.children[1].children[0].href
//         })
// }
// console.log(result)

let iframe = document.createElement("iframe");
document.body.innerText = "";
document.body.appendChild(iframe);
function happen(element,event){
    return new Promise(function(resolve){
        let handler = ()=>{
            resolve();
            element.removeElementListener(event,handler)
        }
        element.addEventListener(event,handler)
    })
}

void async function(){
    for(let standard of standards){
        iframe.src = standard.url;
        console.log(standard.name)
        await happen(iframe, "load")
    }
}();


iframe.src = "https://www.w3.org/TR/2020/CR-css-display-3-20200519/";