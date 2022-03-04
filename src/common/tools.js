import Taro from "@tarojs/taro";
import { objectToString } from "./utils";

const tools = {
  /**
   * 网络请求
   * @param {*} opts
   */
  request: (opts) => {
    const {
      url = "",
      params = {}, // 请求参数
      method = "GET",
      ...rest // 剩余参数
    } = opts;

    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        data: params,
        method,
      })
        .then((res) => {
          const { data } = res;
          if (data?.code === 1) {
            resolve(data);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  /**
   * 隐藏
   */
  hideLoading: () => {
    Taro.hideLoading();
  },
  /**
   * 页面loading
   * @param {*} param
   * @returns
   */
  showLoading: (param = "") => {
    let dptOpts = {
      title: "加载中...",
      mask: true, //防止触摸穿透
    };
    if (Object.prototype.toString.call(param) === "[object String]") {
      dptOpts.title = param;
    } else if (Object.prototype.toString.call(param) === "[object Object]") {
      dptOpts = {
        ...dptOpts,
        ...param,
      };
    }
    return Taro.showLoading(dptOpts);
  },
  /**
   * 导航
   * @param {*} param  url 页面路径
   * @returns data 页面参数
   */
  navigateTo: ({ url, data }) => {
    const searchStr = objectToString(data);
    return Taro.navigateTo({
      url: `${url}?${searchStr}`,
    });
  },
  /**
   * time 缓存有效时间
   * @param {*} key
   * @param {*} value
   * @param {*} time
   */
  setStorageSyncWithTime: (key, value, time) => {
    try {
      const curTime = Date.now();
      // 过期时间
      const expiredTime = curTime + time * 1000;
      Taro.setStorageSync(key, {
        [key]: value,
        expiredTime,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getStorageSyncWithTime: (key) => {
    try {
      const result = Taro.getStorageSync(key);
      const { expiredTime } = result;
      if (Date.now() > expiredTime) {
        // 已过期
        Taro.removeStorageSync(key);
      } else {
        return result[key];
      }
    } catch (err) {
      console.log(err);
    }
  },
  /**
   *
   * @{param}	 fn 如果登录就执行fn
   */
  doLogin: (fn) => {
    const user = tools.getStorageSyncWithTime("userInfo");
    if (!user?.userPhone) {
      tools.navigateTo({
        url: "/pages/login/login",
      });
    } else {
      fn?.();
    }
  },
};

export default tools;
