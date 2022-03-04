import dayjs from "dayjs";

/**
 * 将对象解析成url参数
 * @param {*} obj
 * @returns
 */
export const objectToString = (obj) => {
  let searchKeys = [];
  if (
    Object.prototype.toString.call(obj) === "[object Object]" &&
    Object.keys(obj).length
  ) {
    for (let key in obj) {
      searchKeys.push(`${key}=${obj[key]}`);
    }
  }
  return searchKeys.join("&");
};
/**
 * 延时
 * @param {*} ms 延时时间
 * @returns
 */
export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
/**
 * 获取日期 星期几
 * @param {*} data
 * @returns
 */
export const weekDay = (data = "") => {
  const day = dayjs(data).day();

  switch (day) {
    case 1:
      return "周一";
    case 2:
      return "周二";
    case 3:
      return "周三";
    case 4:
      return "周四";
    case 5:
      return "周五";
    case 6:
      return "周六";
    case 0:
      return "周日";
    default:
      return "";
  }
};
