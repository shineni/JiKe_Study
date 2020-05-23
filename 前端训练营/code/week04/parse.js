const EOF = Symbol("EOF"); //EOF: End of File

function data(c){
    if(c=="<"){
        return tagOpen
    }
    else if(c===EOF){
        return ;
    }
    else{
        return data;
    }

}

function tagOpen(c){
    if(c=="/"){
        return endTageOpen
    }
    else if(c.match(/d/)){
        return tagName(c)
    }
    else{
        return
    }
}
function tagName(c){
    
}


module.exports.parseHTML = function parseHTML(html){
    // console.log(html)
    let state = data;
    for(let c of html){
        state = state(c);
    }
    state = state(EOF);

}