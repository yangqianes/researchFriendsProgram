function formatTime(date) {
  // let year = data.getYear()
  let hour = date.getHours()
  let minute = date.getMinutes()

  // for (var i = 0; i <= 9; i++) {
  //   if (minute == i) {
  //     minute = "0" + minute;
  //   }
  //   if (hour == i) {
  //     hour = "0" + hour
  //   }
  // }
  hour = checkTime(hour)
  minute = checkTime(minute)
  return hour + ":" + minute
}
function fullTime(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours()
  let minute = date.getMinutes()
  let seconds = date.getSeconds()
  // for (var i = 0; i <= 9; i++) {
  //   if (minute == i) {
  //     minute = "0" + minute;
  //   }
  //   if (hour == i) {
  //     hour = "0" + hour
  //   }
  // }
  month = checkTime(month)
  day = checkTime(day);
  hour = checkTime(hour);
  minute = checkTime(minute);
  seconds = checkTime(seconds);
  return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds
}
function leftTimer(year, month, day, hour, minute, second) {
  let leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数 
  let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //剩余的天数 
  let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //剩余的小时 
  let minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//剩余的分钟 
  let seconds = parseInt(leftTime / 1000 % 60, 10);//剩余的秒数 
  days = checkTime(days);
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);
  // setInterval("leftTimer(2018,11,11,11,11,11)", 1000);
  return days + "天" + hours + "时" + minutes + "分";
}
function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

module.exports = {
  leftTimer: leftTimer,
  formatTime: formatTime,
  fullTime: fullTime
}