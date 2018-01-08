const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 获取随机数
const getRandomNumber = (n1 = 1, n2 = 100, type = 'int', digit = 2) => {
  n1 = parseFloat(n1);
  n2 = parseFloat(n2);
  if(isNaN(n1) || isNaN(n2)) return '请输入正确的数字';
  let small, big, random;
  if(n1 === n2){
    return n1;
  }else if(n1 < n2){
    small = n1;
    big = n2;
  }else{
    small = n2;
    big = n1;
  }
  random = Math.random() * (big - small) + small;
  if(type === 'int'){
    return parseInt(random);
  }else{
    if (isNaN(parseInt(digit))) return '请输入正确的小数位数';
    let tens = Math.pow(10, digit);
    random = Math.round(random * tens) / tens;
  }
}

module.exports = {
  formatTime: formatTime,
  getRandomNumber: getRandomNumber
}
