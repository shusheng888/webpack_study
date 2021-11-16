import helloWord from "./helloWord";
import imgSrc1 from './assets/img-1.png'
import imgSrc2 from './assets/img-2.svg'
import dataJson from './assets/example.json'
import imgSrc3 from './assets/img-3.jpeg'
import './style.css'
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
