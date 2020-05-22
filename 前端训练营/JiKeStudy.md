# 极客时间--重学前端
## 第一周
### 1.概述以及学习方法介绍
#### 1.1 前端技能模型
![前端技能模型.PNG](.\imgs\第一周\前端技能模型.PNG)
#### 1.2 前端学习方法
- 整理法
	- 顺序关系
![顺序关系.PNG](.\imgs\第一周\顺序关系.PNG)
	- 组合关系
![组合关系.PNG](.\imgs\第一周\组合关系.PNG)
	- 维度关系
![维度关系.PNG](.\imgs\第一周\维度关系.PNG)
	- 分类关系
![分类关系.PNG](.\imgs\第一周\分类关系.PNG)

- 追溯法
![追溯法.PNG](.\imgs\第一周\追溯法.PNG)
	- 案例分析闭包（Closure）
		- 【源头】找维基百科，查询一下历史
		- 【标准文档】谷歌学术搜索：
			- https://scholar.google.com/
			- https://www.w3.org/
			- https://developer.mozilla.org/
            - https://docs.microsoft.com/
            - https://developer.apple.com/
		- 【找大师】

#### 1.3 前端学习准备
- 下载JavaScript的标准ECMA
	- https://www.ecma-international.org/
	- 选Standards
![ECMA下载截图.PNG](.\imgs\第一周\ECMA下载截图.PNG)
	- 选ECMA262
![ECMA262.PNG](.\imgs\第一周\ECMA262.PNG)
	- 下载PDF版本


#### 1.2 权威前端网站
用于整理知识体系，可以通过whatwg目录，组织完备的体系
- https://www.w3.org/
- https://whatwg.org/

比较好的网站
- https://scholar.google.com/
- https://www.w3.org/
- MDN: https://developer.mozilla.org/
- https://docs.microsoft.com/
- https://developer.apple.com/

### 2.前端思维导图梳理

![前端知识体系.PNG](.\imgs\第一周\前端知识体系.PNG)

#### 2.1 HTML

![前端知识体系_HTML.PNG](.\imgs\第一周\前端知识体系_HTML.PNG)

- HTML
	- DTD资料搜查
		- 谷歌搜索html4.0 dtd
		- 打开HTML的DTD规范网址：https://www.w3.org/TR/2018/SPSD-xhtml1-20180327/DTD/xhtml1-strict.dtd

	- entity文件
		![DTDFile.PNG](.\imgs\第一周\DTDFile.PNG)
        - https://www.w3.org/TR/2018/SPSD-xhtml1-20180327/DTD/xhtml-lat1.ent
        - https://www.w3.org/TR/2018/SPSD-xhtml1-20180327/DTD/xhtml-symbol.ent
        - https://www.w3.org/TR/2018/SPSD-xhtml1-20180327/DTD/xhtml-special.ent
    ```
    HTML5 的 DTD
    <!doctype html>
    ```

**简单示例code**

![HTML样本.PNG](.\imgs\第一周\HTML样本.PNG)

#### 2.2 Javascript
![前端知识体系_Javascript.PNG](.\imgs\第一周\前端知识体系_Javascript.PNG)
运行时JobRun()
![运行时.PNG](.\imgs\第一周\运行时.PNG)
有趣代码片段
![有趣的空白符.PNG](.\imgs\第一周\有趣的空白符.PNG)

#### 2.3 CSS

![前端知识体系_CSS.PNG](.\imgs\第一周\前端知识体系_CSS.PNG)

- 参考W3网站的CSS2.1
- CSS规则
![CSS规则.PNG](.\imgs\第一周\CSS规则.PNG)
	- Selector3

### 3.前端思维导图详细（详见Xmind文件）

### 4.前端工程体系
#### 4.1 优秀工程师是什么样的
![优秀工程师.PNG](.\imgs\第一周\优秀工程师.PNG)
#### 4.1 职业发展的方法论
![职业发展方法论.PNG](.\imgs\第一周\职业发展方法论.PNG)

![业务型成就.PNG](.\imgs\第一周\业务型成就.PNG)

![技术难题.PNG](.\imgs\第一周\技术难题.PNG)

![工程性成就.PNG](.\imgs\第一周\工程性成就.PNG)

![持续集成.PNG](.\imgs\第一周\持续集成.PNG)

![技术架构.PNG](.\imgs\第一周\技术架构.PNG)

![技术架构2.PNG](.\imgs\第一周\技术架构2.PNG)

**【相关链接：】**
- ITEF
	- https://tools.ietf.org/html/rfc3986
	- https://tools.ietf.org/
	- URL 相关： https://svn.apache.org/repos/asf/labs/webarch/trunk/uri/rev-2002/issues.html
- 前端手册
	- https://fed.taobao.org/blog/taofed/do71ct/fed-learning-quizzes-apply/?spm=taofed.blogs.blog-list.9.44fe5ac8p6qg66

- SpriteJS
	- https://github.com/spritejs/spritejs
	- https://spritejs.org/#/

**【专业名词，相关推荐】**
- UV：（Unique Visitor）独立访客，统计 1 天内访问某站点的用户数 (以 cookie 为依据)，如果清除了 cookies 或者更换设备访问，计数会加 1。按用户算的，比较真实一点。
- PV：（Page View）访问量, 即页面浏览量或点击量，在一定统计周期内用户每打开或刷新一个页面就记录 1 次。
- ctr：点击率（click-through rate）
- 判断用户活跃度：日活除以月活
- CICD：持续集成 (Continuous Integration) 和持续部署 (Continuous Deployment) 简称。
- SpriteJS：是跨平台的高性能图形系统，它能够支持 web、node、桌面应用和小程序的图形绘制和实现各种动画效果。
- 前端之巅：InfoQ 旗下关注大前端的技术社群
- 龙书：《编译原理》

重点学习的数据结构：
数组
二叉树


## 第二周 (Javascript)
### 1.编程语言的通识
** 本节你需要知道什么？**
1. 如何定义一个语言
2. 如何去描述一种语言

![结构图.PNG](.\imgs\第二周\结构图.PNG)

#### 1.1 语言按语法分类
- 非形式语言（中文，英文）
- 形式语言(乔姆斯基谱系)（层级）
    - 0型 无限制文法
    - 1型 上下文相关文法（对引擎限制强，不太友好）
    - 2型 上下文无关文法（一个词放在任何位置都一样）
    - 3型 正则文法（能用正则表达式解释的文法，对表达能力要求比较高，限制表达能力）
        - 只允许左递归

【注意】
现在大多数语言文法都分为：词法 + 语法
- 词法通过正则进行粗略处理，将语言变成单个的词，正则表达式的扫描过程叫做词法分析
- 再将词变成输入流进行语法分析，根据产生式建立语法树，裁剪不需要的，形成抽象语法树的过程叫做语法分析

#### 1.2 产生式

![产生式BNF.PNG](.\imgs\第二周\产生式BNF.PNG)
基础结构：类似JS的字符串，单个词如*
复合结构：如乘法表达式
终结符：类似字符串
【小练习】
1.规定一门语法，只能用a和b两种字符表示,可以任意的顺序
2.编写带括号的四则运算产生式

#### 1.3 产生式通过产生式理解乔姆斯基谱系

![乔姆斯基谱系.PNG](.\imgs\第二周\乔姆斯基谱系.PNG)

//十进制整数正则表达式
`<DecimalNumber> = /"0"|[1-9][0-9]]*/`

    【关于JS】
    词法定义--------双冒号：：
    语法定义---------单冒号：
    终结符 ---------加粗来实现
    Scripts 和Module是顶层的结构
    JS关键部分在Grammer Summary

get 是I型，上下文相关

#### 1.4 图灵完备性
- 图灵完备性
    - 命令式-图灵机
        - goto
        - if 和while
    - 声明式 ——lambda
        递归

#### 1.5 动态与静态
- 动态
    - 在用户的设备/在线服务器上
    - 产品实际运行时
    - Runtime
- 静态
    - 在程序员的设备商
    - 产品开发是
    - Compiletime
    - 类型系统
        - 动态类型系统与静态类型系统
        - 强类型（无隐式转换的类型）与弱类型 （有隐式转换的类型）
            - String + Number
            - String == Boolean
        - 复合类型
            - 结构体（对象是一种特殊的结构体）
            - 函数签名
        - 子类型
            - 逆变
            - 协变（同向）

【相关参考】
- 终结符： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/ 終結符與非終結符）
- 产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句
- 静态和动态语言： https://www.cnblogs.com/raind/p/8551791.html
- 协变与逆变： https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html
- Yacc 与 Lex 快速入门： https://www.ibm.com/developerworks/cn/linux/sdk/lex/index.html
- 关于元编程： https://www.zhihu.com/question/23856985

### 2.JavaScript
### 2.1课前准备
ASCII字符128个
Unicode Blocks 字符集，把所有国家的字符都包含在里面了（2个视角）
- Block
	- 0-128 ASCII兼容部分
	- CJK 中日韩三国语言
	- BMP 基本字符平面，兼容性特别好，四位以内的
		`"厉害".codePointAt(0).toString(36)`
        如果必须要中文，那用中文的编码来实现用\u+编码 实现
	-
- Categories
Unicode的官方网站：
https://www.fileformat.info/info/unicode/

重要 回车  和SPACE


![Unicode.PNG](.\imgs\第二周\Unicode.PNG)
### 2.2顶级输入元素
- whiteSpace
    - Tab
    - VT 纵向制表符
    - FF  000A
    - SP   U+0020
    - NBSP U+00A0 重点在处理排版 Java Script &nbsp; 此时Java Script 不会分开，一定会在一行
    - WNBSP
    - USP
- LineTerminator
    - LF 只建议使用这个
    - CR
    - LS（超出Unicode的范围，不建议使用）
    - PS（超出Unicode的范围，不建议使用）

- Comment
    单行注释 //
    多行注释 /* 开头 */结尾
- Token JavaScript中一切有用的东西都是token，包括验证的令牌
	- 用于代码结构
		- Punctuator 符号 （）= <>
		- Keywords
	- 有效信息
        - IdentifierName 标识符
            变量名部分 不能包含关键字
            属性名部分 可以和关键字重合
         - Identifier (ASCII范围内只有字母)
            语法：必须以字母(UniCodeIDStart)，下划线，$开头(下划线和$是JS的特殊规定)
         - Keywords
		 - Future reserved Keywords:num 保留字
		- Literal 直接量 

       - Number
           - IEEE754 Double Float(内存布局)
               - Sign(1)
               - Exponent(11)
               - Fraction(54)
           - 语法
               - DecimalLiteral 十进制
                   - 12.1E10可以科学计数法
                   - 小数点前后都可以省略
               - BinaryIntegerLiteral二进制0B
               - OctalIntegerLiteral 八进制0O
               - HexIntegerLiteral 十进制0X
               	- 判断是不是相等： Math.abs(0.1+0.2-0.3)<= Number.EPSILON
       - Null
       - Boolean
       - Object
       - String
           - Character
           - Code Point
           - Encoding
               - ASCII
               - Unicode（UTF）  JavaSctip默认是UTF编码，超出部分就用两个字符编码
               - UCS U+0000 -U+FFFF 超出Unicode的一部分
               - GB(ASCII兼容)
               - GB 2312
               - GBK（GB13000）
               - GB18030
               - ISO-8859 一堆欧洲国家的标准
               - BIG5 台湾那边，只有繁体中文

97 .toString(2) 为什么要加一个空格，因为97.是一个合法的数据

    语法(707页)
    1. ""
        "\x10"两位
        "\u"四位
        "\\"
    2. ''
    3.``模板字符串
        拆成两部分`` 和“${}"
        ` I said : "${
        a
        }" `

```
var a;
a
/a/g   //除法 1/g 能插除号的地方就插除号，不能插除号的地方就插正则表达式
```
【作业1】写一个正则，匹配所有的Number 167页number不支持负数
【作业2】通过查阅资料写一个UTF8的Encoding的函数
【作业3】写一个正则表达式，匹配所有的字符串直接量，单引号和双引号


## 第三周
思维导图：JS Grammer.xmind

###1.遗留问题：float在内存里面的分布

![浮点.PNG](.\imgs\第三周\浮点.PNG)
- 有效数字： 10进制第一位一定是非0的值，二进制第一位一定是1
- 浮点数是要设置一个可以接受的精度损失

**【如何检查正负零】**
```
function check(zero){
    if(1/zero ===Infinity){
        return 1;
    }
    if(1/zero===-Infinity){
        return -1
    }
}
//稳定的sign函数可以直接取符号位
function sign(number){
    if(Math.abs(number)===0){
        check(number)
    }
    else{
        return number/Math.abs(number)
    }
}
```

buffer内存
https://jsfiddle.net/pLh8qeor/19/

###2.Grammer 语法部分
![词法语法运行时框架.PNG](.\imgs\第三周\词法语法运行时框架.PNG)



![Expresssion.PNG](.\imgs\第三周\Expresssion.PNG)



#### 2.1 Expression**【代码参考：\code\week03\super.html】**

![LeftHand.PNG](.\imgs\第三周\LeftHand.PNG)

- Member属性访问，成员访问,property运算，取一个属性 运算能保持可写的特性，返回的是Reference 类型
	- a.b
		- o.x 返回的是Reference 类型
		- Reference由两部分组成
			- Object
			- Key
		- o.x +2 它会找到reference的值然后去做加法
		- 写的能力只有delete 和assign
	- a[b]
	- foo`string`
	- super.b
	- super['b']
	- new.target
	- new Foo()
![Reference.PNG](.\imgs\第三周\Reference.PNG)


```
//【实例1】new.Target
function foo(){
    console.logn(new.target);
}
foo(); // undefined
new foo();
// ƒ foo(){
//     console.log(new.target);
// }

//伪造一个函数
var fakeOject = {};
Object.setPrototypeOf(fakeOject,foo.prototype);
fakeOject.constructor= foo;
foo.apply(fakeOject);
fakeOject instanceof foo; //true  instanceof是走原型链的

//ES5中不好判断是被new调用还是被普通的方法调用

// 【实例2】：Super：调用父类的方法或者属性
class Parent{
    constructor(){
        this.a=1
    }
}
class Child extends Parent{
    constructor(){
        super();
		console.log(this.a);
    }

}
Parent.a=1;
new Child; //1

// 实例3：模板字符串以及参数 foo`string`
var name ="shien";
`Hello, ${name}`;
function foo(){
        console.log(arguments)
}
foo`Hello ${name} `

// 实例4：带括号优先级高
function cls1(s){
    console.log(s)
}
function cls2(s){
    console.log("2",s)
    return cls1;
}
cls1("s1")
cls2("s2")
new cls2("s2")
new (new cls2("s2"))
new new cls2("good")
```

- New
- Call 函数调用
	- new a()["b"]先new 再取b

![RightHand.PNG](.\imgs\第三周\RightHand.PNG)

- Update
- Unary(Page 178)
    - void 起到一个改变语法结构的作用
    - IFFE：Immediately-invoked Function Expressions 立即执行的函数表达式
    - typeof typeof null 返回的是object typeof function(){} 返回的是function
- Exponatal
- Multiplicative
- Additive
- Shift
- Relationship
- Equality
- Bitwise
- Logical
- Conditional
```
// 用一个函数产生一个作用域
//推荐用void，不用()实现自执行函数 有一个好处就是语法合理
for (var i = 0;i<10;i++){
    var button = document.createElement("button");
    document.body.appendChild(button)
    button.innerHTML=i;
    void function(i){
        button.onclick= function(){
        console.log(i)
        }
    }(i)
}
```

#### 2.2 Atom **【代码参考：\code\week03\statement.html】**


![Atom.PNG](.\imgs\第三周\Atom.PNG)
![运行时.PNG](.\imgs\第三周\运行时.PNG)
- 声明
	- funtion
	- function *
	- async function
	- async function
	- var

=> 图灵完备的语言
加法
	- 数字类型的加法
	- 字符串的加法


###3.类型转换

![类型转换.PNG](.\imgs\第三周\类型转换.PNG)
- 装箱
    JS中的类和类型是分开的，四个构造函数（四种类）： String Number Symbol Boolean
    new Number(1)    把1包装成一个Number对象
    new String("hello")  把hello包装成一个String对象

    构造函数 String Number Boolean 不作为new调用时，就转为普通的类型，如果带new就会返回对应的对象
    【推荐】使用手动转换

    Oject 不管带new 和不带new都是一样的
    强制装箱:  Object("1")  New Object("1")

    Symbol new不了，但是可以直接调用
    装箱方式一： Object(Symbol("1"))
    装箱方式二：(function(){return this}).apply(Symbol("x"))

- 拆箱：如果有Primitive,则只会调用toPrimitive,如果没有Primitive会调用默认的toPrimitive代码,而该默认的代码会先调用valueof然后调用toString
	- toPrimitive() 优先级最高，如果return一个对象那么就会直接报错
	- "1"+{[Symbol.toPrimitive](){return {}},valueof(){return "1"},toString(){return "2"}}
    -valueOf()  优先级次之
    -toString() 没有优先级

【练习】
StringToNumber
parseFloat

NumberToString

- Iteration

###4.面向对象

![面向对象.PNG](.\imgs\第三周\面向对象.PNG)
#### 4.1 对象的三要素
- 对象唯一标识性
- 有状态
- 有行为

封装，解耦， 内聚， 复用【描述架构】
继承【面向对象的子系统】
多态【描述动态性的程度】

【推荐阅读】面向对象《面向对象分析与设计》

#### 4.2 面向对象第一范式（基于类）

![基于类.PNG](.\imgs\第三周\基于类.PNG)


#### 4.3 面向对象第二范式（基于对象）

![基于原型.PNG](.\imgs\第三周\基于原型.PNG)

#### 4.4 JavaScript中的对象

![OjectinJS.PNG](.\imgs\第三周\OjectinJS.PNG)

- JavaScript运行时，原生对象的描述方式非常简单，只需要**关心原型**和**属性**两个部分
- JavaScript用属性来统一抽象对象的状态和行为，
	- Javascript中的属性分为两种
        - 数据属性：描述状态。如果数据属性中存储函数，也可以用于描述行为
        - 访问器属性：用于描述行为
	- 属性访问： 当访问属性时，如果当前对象没有该属性，则会沿着原型找原型对象是否有次名称的属性，而原型对象还可能有原型，因此会有原型，因此会有“原型链”这一说法。该算法保证了每个对象只需要描述自己和原型的区别即可。

- **特殊的对象**
    - 函数对象(特殊的对象)
        - 特殊之处：除了一般对象上的属性和原型，函数对象还有一个行为[[call]]
        - 我们用JavaScript中的function关键字，箭头运算符或者Function构造器创建的对象，会有[[call]]这个行为
        - 用类似f()这样的语法把对象当做函数调用时，会访问到[[call]]这个行为
        - 如果对于的对象没有[[call]]行为，则会报错
    - Array[[length]]
    - Object.prototype[[setPrototypeOf]]


Oject API/Grammer
- {}.[] Object.defineProperty
- Object.create/Object.setPrptptypeOf/Object.getPrototypeOf   基于原型的面向对象的系统
- new/class/extends
- new/function/prototype
不要二三混用，不要使用第四个



## 第四周(结构化)
![OC.PNG](.\imgs\第五周\OC.PNG)
OC： Objective-C 是一种通用、高级、面向对象的编程语言。它扩展了标准的 ANSI C 编程语言，将 Smalltalk 式的消息传递机制加入到 ANSI C 中。当前主要支持的编译器有 GCC 和 Clang（采用 LLVM 作为后端）。
Promise相关： **【代码参考：\code\week03\statement.html】**

###4.1 JS执行粒度

![JS执行粒度.PNG](.\imgs\第四周\JS执行粒度.PNG)

**Realm**——它里面有一套完整的JS内置对象


**函数调用**

![函数调用分析图.PNG](.\imgs\第五周\函数调用分析图.PNG)
- Exectution Context执行上下文
	- ECMAScript Code Excution
    	- code evaluation state
    	- Function
    	- Script or Module
    	- Realm
    	- LexicalEnvironment
    	- VariableEnvironment
    - Generator Executin Contexts
		- code evaluation state
    	- Function
    	- Script or Module
    	- Realm
    	- LexicalEnvironment
    	- VariableEnvironment
    	- Generator

![ExecutionContext.PNG](.\imgs\第五周\ExecutionContext.PNG)
**LexicalEnvironment 和 VariableEnvironment**
![词法和变量环境.PNG](.\imgs\第五周\词法和变量环境.PNG)
**组成LexicalEnvironment 和 VariableEnvironment的结构**

![EnvironmentRecords.PNG](.\imgs\第五周\EnvironmentRecords.PNG)
**如何产生LexicalEnvironment里面的内容-----【该机制就是JS中Closure闭包的原理】**

![Closure.PNG](.\imgs\第五周\Closure.PNG)


## 第五周
###1. 浏览器
#### 1.1浏览器执行过程
![浏览器.PNG](.\imgs\第五周\浏览器.PNG)
#### 1.2 ISO-OSI七层网络模型

![网络模型.PNG](.\imgs\第五周\网络模型.PNG)

#### 1.3 ISO-OSI七层网络模型
TCP


## 第六周
### 状态机--有限状态机
- 每一个状态都是一个机器
    - 在每一个机器里，我们可以做计算，存储，输出......
    - 所有的这些机器接受的输入是一致的
    - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
- 每一个机器知道下一个状态
    - 每个机器都有确定的下一个状态(Moore)
    - 每个机器根据输入决定下一个状态(Mealy)
    	- 每个函数是一个状态
```
function state(input)//函数参数就是输入
{
	//在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next;//返回值作为下一个状态
}

//以下是调用
while(input){
	//获取输入
    state = state(input) //把状态记得返回值作为下一个状态
}
```

### 案例1：在一个字符串中，找到字符“a”
### 案例2：在一个字符串中，找到字符“ab”
### 案例3：在字符串中找到字符串“abcdef”

###  HTML转DOM
- 第一步： 拆分文件
	- 为了方便文件管理，我们把parser单独拆到文件中
	- parser接受HTML文本作为参数，返回一颗DOM树
	-小技巧： 先写接口然后运行，然后填充内容
- 第二步： 创建一个状态机
	- 我们用FSM来实现HTML的分析
	- 在HTML标准中，已经规定了HTML的状态
	- Toy-Broswer只挑选其中一部分状态完成一个最简版本
- 第三步：
	- 主要的标签有：开始标签，结束标签，自封闭标签
	- 在该步暂时忽略属性
- 第四步：创建元素
















