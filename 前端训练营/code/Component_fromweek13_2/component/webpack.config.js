module.exports = {
    entry:'./main.js',
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env'],
                        //一个数组是一个插件, pragma意思是翻译成什么，函数名
                        plugins:[['@babel/plugin-transform-react-jsx',{pragma:"createElement"}]]
                    }
                }
            }
        ]
    },
    //使得编译好的代码可读
    mode:'development',
    optimization:{
        minimize:false
    }


}