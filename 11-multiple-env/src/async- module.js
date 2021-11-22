function getAsyncMoudle(){
    return import('loadsh')
        .then(({
            default:_
        })=>{
            const div1 = document.createElement('div');
            div1.innerHTML = _.join(['Async','moudle','loaded'],'__--')
            return div1
    })
        .catch(reason => 'An error occured while loading the component!')
}
getAsyncMoudle().then(ele=>{
    console.log('【 ele】', ele)
    document.body.appendChild(ele);
})