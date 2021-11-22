import helloWord from "./helloWord";
import imgSrc1 from './assets/img-1.png'
import imgSrc2 from './assets/img-2.svg'
import dataJson from './assets/example.json'
import imgSrc3 from './assets/img-3.jpeg'
import './style.less'
import './style1.css'
import dataCsv  from './assets/data.csv'
import dataXml from './assets/data.xml'
import toml from './assets/data.toml';
import yaml from './assets/data.yaml';
import json from './assets/data.json5';
import _ from "loadsh";
import './async- module'


document.body.classList.add('hello')
helloWord();


const img1 = document.createElement('img');
img1.src = imgSrc1;
document.body.appendChild(img1)

const img2 = document.createElement('img');

img2.src = imgSrc2;
document.body.appendChild(img2)


const dataDiv = document.createElement('div');
dataDiv.style.cssText='background:aliceblue';
dataDiv.textContent = dataJson;
document.body.appendChild(dataDiv)

const img3 = document.createElement('img');
img3.style.cssText='width:200px;height:280px'
img3.src = imgSrc3;
document.body.appendChild(img3)

const div1 = document.createElement('div');
div1.style.cssText='width:200px;height:280px'
div1.classList.add('bg-url')
document.body.appendChild(div1)

const span1 = document.createElement('span');
span1.style.cssText='width:200px;height:280px'
span1.classList.add('iconn')
span1.innerHTML='&#xe668';//插入icon字体
document.body.appendChild(span1)

//控制台打印输出csv表格数据和xml格式数据
console.log('【 dataCsv】', dataCsv)//csv格式显示数组
console.log('【 dataXml】', dataXml)//xml格式显示对象

//json数据解析
console.log('【 toml.title】', toml.title)
console.log('【 yaml.title】', yaml.title)
console.log('【 json.title】', json)

function getString(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('【 先打印输出】')
            console.log('【 先打印输出】')
        },3000)
    })
}

(async function toDo(){
    await getString()
    await console.log('【 再走后面】')
})()


const div2 = document.createElement('div');
div2.innerText = _.join(['Index','moudle','loaded','!'],'----');
document.body.appendChild(div2);

const buttonElement = document.createElement('button')
buttonElement.textContent = '执行加法运算'
buttonElement.addEventListener('click',()=>{
    import(/* webpackChunkName: 'math' , webpackPrefetch: true */ './math.js')
        .then(({add})=>{
        alert(add(4,5))
    })
        .catch(()=>{
            alert('程序错误')
        })
})
document.body.appendChild(buttonElement)
const buttonElement2 = document.createElement('button')
buttonElement2.textContent = '预加载模式'
buttonElement2.addEventListener('click',()=>{
    import(/* webpackChunkName: 'preload' , webpackPreload: true */ './preload.js')
        .then(({preload})=>{
        preload()
    })
        .catch(()=>{
            alert('程序错误')
        })
})
document.body.appendChild(buttonElement2)
console.log('【 不知道哪个版本的】',)