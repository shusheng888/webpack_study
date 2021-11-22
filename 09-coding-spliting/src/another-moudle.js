import _ from 'loadsh';


const div = document.createElement('div');
div.innerText = _.join(['Another','moudle','loaded','!'],'----');
document.body.appendChild(div);
