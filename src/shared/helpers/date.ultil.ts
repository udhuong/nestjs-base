/* eslint-disable */
function getWeekDay(date) {
  let weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  return weekDays[date.getDay()];
}

function getDateAgo(date, days) {
  // khởi tạo biến dateAgo bằng với date hiện tại
  // để không làm thay đổi giá trị của tham số date
  let dateAgo = new Date(date.getTime());

  // lùi về số ngày là: days
  dateAgo.setDate(dateAgo.getDate() - days);

  // trả về giá trị ngày trong tháng
  return dateAgo.getDate();
}

function getLastDayOfMonth(year, month) {
  // lấy date ứng với ngày đầu tiên của tháng tiếp theo
  let date = new Date(year, month + 1);

  // giảm date đi 1 đơn vị để lấy ngày cuối cùng của tháng hiện tại
  date.setDate(date.getDate() - 1);
  //Hoặc
  // date.setDate(0);

  // trả về date
  return date.getDate();
}

/**
 * trả về số giây đã qua của ngày hôm nay
 */
function getSecondsDay() {
  // lấy thời điểm hiện tại
  let nowDate = new Date();

  // lấy thời điểm 0 giờ 0 phút 0 giây của ngày hiện tại
  let beginingDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate());

  return Math.round((nowDate.getTime() - beginingDate.getTime()) / 1000);
}

function getSecondsToTomorrow() {
  // thời điểm hiện tại
  let nowDate = new Date();

  // 0 giờ, 0 phút, 0 giây ngày tiếp theo
  let tomorrowDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), nowDate.getDate() + 1);

  return Math.round((tomorrowDate.getTime() - nowDate.getTime()) / 1000);
}
