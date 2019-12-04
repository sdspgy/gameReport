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

var weekFunction = function(ds) {
  let week = new Date(ds);
  let dateweek = week.getDay();
  let i = 7 - dateweek;
  switch (i) {
    case 7:
      ds = ds + "(七)";
      break
    case 1:
      ds = ds + "(六)";
      break
    case 2:
      ds = ds + "(五)";
      break
    case 3:
      ds = ds + "(四)";
      break
    case 4:
      ds = ds + "(三)";
      break
    case 5:
      ds = ds + "(二)";
      break
    case 6:
      ds = ds + "(一)";
      break
    default:
  }
  return ds;
}

const requestUrl = "https://report.nuojuekeji.com/report";
// const requestUrl = "http://10.2.64.47:8081/report";

const log = info => {
  return console.log("-------------" + info + "-------------")
}

const math = info => {
  const x = Math.floor(Math.random() * info);
  return x;
}

/**
 * ------------加载图标-----------
 */
function showLoading() {
  wx.showLoading({
    title: '正在加载...',
    mask: true
  });
}
/**
 * -----------清除加载图标-----------
 */
function cleanLoading() {
  setTimeout(function() {
    wx.hideLoading();
  }, 100);
}
/**
 * -------------成功图标----------
 */
function showSuccess(text) {
  wx.showToast({
    title: text == undefined ? "success" : text,
    icon: 'success',
    duration: 1000
  });
}

module.exports = {
  formatTime: formatTime,
  week: weekFunction,
  requestUrl: requestUrl,
  log,
  math,
  showLoading,
  cleanLoading,
  showSuccess,
}