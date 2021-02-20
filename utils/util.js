const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function debounce(func,delay = 100) {
  let timer = null;
  return function() {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this,arguments);
    },delay);
  }
}

module.exports = {
  formatTime,
  debounce
}
