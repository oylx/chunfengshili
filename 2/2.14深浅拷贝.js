let richBoy = {
  name: '开心',
  car: ['宝马', '奔驰', '保时捷'],
  deive: () => {
    console.log('hi');
  },
  age: undefined,
};

let deepClone = obj => {
  let newObj = Array.isArray(obj) ? []: {}

  if(obj && typeof obj === 'object'){
    for(let key in obj){
      if(obj.hasOwnProperty(key)){
        if(obj[key] && typeof obj[key] === 'object') {
          newObj[key] = deepClone(obj[key])
        } else {
          newObj[key] = obj[key]
        }
      }
    }
  }
  return newObj
}
let richGirl = deepClone(richBoy)
richBoy.name = '不开心';
richBoy.car[0] = '奥迪';
richBoy.age = 12
richBoy.deive = () =>{}
console.log(richGirl);
