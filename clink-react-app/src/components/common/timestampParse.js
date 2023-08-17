export default function timestampParse(t) {
  const target_date = new Date(t); // 작성시간
  const curr = new Date(); // 현재시간

  const utc_target_date =
    target_date.getTime() + target_date.getTimezoneOffset() * 60 * 1000;
  const utc_curr = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const kr_utc_target_date = new Date(utc_target_date);
  const kr_utc_curr = new Date(utc_curr + KR_TIME_DIFF);

  if (kr_utc_curr - target_date + KR_TIME_DIFF < 60 * 60 * 1000) {
    return (
      Math.floor((kr_utc_curr - target_date + KR_TIME_DIFF) / 60000) + "분 전"
    );
  }
  let year = kr_utc_target_date.getFullYear(); //년도 구하기
  let month = kr_utc_target_date.getMonth() + 1;
  let day = kr_utc_target_date.getDate();
  let hour = kr_utc_target_date.getHours();
  let minute = kr_utc_target_date.getMinutes();
  let second = kr_utc_target_date.getSeconds();

  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  return year + "년 " + month + "월 " + day + "일 " + hour + ":" + minute;
}
