// 防抖函数接收4个参数
// 1.需要被防抖的方法 2.延时多久（毫秒） 3.是否立即执行 4.返回传入方法的执行结果
/**
 * 防抖函数
 * @param fn 需要防抖的执行函数
 * @param delay 每次延时多久
 * @param immed 是否立即执行
 * @param resultCallback 回调函数
 * @returns Promise
 */
const debounce = (fn, delay, immed = false, resultCallback: (result) => void) => {
  let timer; // 记录定时器
  let isExecute = false; // 记录是否立即执行过

  // 返回一个函数，该函数接收若干参数，并返回一个Promise，该函数将被作为新的函数执行体被外界调用
  function _debounce(...arg) {
    return new Promise((resolve, reject) => {
      // 如果timer有值说明已存在定时器，则清理定时器
      timer && clearTimeout(timer);

      // 如果没有立即执行过，并且immed为true，则立即执行一次
      if (immed && !isExecute) {
        // 使用fn.call()的方式执行，显式绑定this，并将所有参数传入fn
        // 如果直接使用fn()调用，this将直接指向window，导致无法获取外部的this
        const result = fn.call(this, ...arg);

        // 如果传入了回调，则执行回调，并把结果传入，这是第一种返回执行结果的方法
        resultCallback && resultCallback(result);

        // 直接在resolve中返回结果，是第二种返回执行结果的方法
        resolve(result);

        // 执行完后将isExecute设置为true，表示已经立即执行过
        isExecute = true;
      } else {
        // 非立即执行状态下，则创建定时器，延时执行传入的函数
        timer = setTimeout(() => {
          // fn.apply(this, arg)
          const result = fn.call(this, ...arg);
          resultCallback && resultCallback(result);
          resolve(result);

          // 重置状态，执行完后需要将isExecute重置为false，并将timer重置为null
          isExecute = false;
          timer = null;
        }, delay);
      }
    });
  }
  // 取消方法，直接清除定时器即可
  _debounce.cancel = () => {
    timer && clearInterval(timer);
  };
  return _debounce;
};

/**
 * 节流函数
 * @param fn 需要节流的执行函数
 * @param interval 函数执行时间间隔
 * @param options 选项：leading:是否立即执行 trailing：是否在最后执行 resultCallback:回调函数
 * @returns Promise
 */
const throttle = (
  fn,
  interval,
  options: { leading: boolean; trailing: boolean; resultCallback?: (result: any) => void } = {
    leading: true,
    trailing: false
  }
) => {
  const { leading, trailing, resultCallback } = options;

  // 最近时间，第一次执行是默认为0
  let lastTime = 0;

  // leading 选项可控制函数是否在第一次时立即执行 默认为执行
  // 不做处理时第一次会执行，是因为remainTime的值小于0，因为lastTime=0,所以计算结果一定是小于0的
  // 为了可控第一次是否立即执行，只需要控制lastTime的值即可
  // 使lastTime = nowTime 这样的话 nowTime - lastTime 就等于0了， remainTime就会等于interval，大于零就不会执行函数

  // trailing 选项可控制最后一次调用方法，若到达间隔时间点，是否执行
  let timer;

  // 同样返回一个新的方法提供给外界调用，并接收若干参数
  function _throttle(...arg) {
    return new Promise((resolve, reject) => {
      // 获取当前时间
      const nowTime = new Date().getTime();
      if (!leading && !lastTime) lastTime = nowTime;
      const remainTime = interval - (nowTime - lastTime);
      if (remainTime <= 0) {
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
        const result = fn.apply(this, arg);
        lastTime = nowTime;
        resultCallback && resultCallback(result);
        resolve(result);
      }
      if (!timer && remainTime > 0 && trailing) {
        timer = setTimeout(() => {
          lastTime = !leading ? 0 : new Date().getTime();
          timer = null;
          const result = fn.apply(this, arg);
          resultCallback && resultCallback(result);
          resolve(result);
        }, remainTime);
      }
    });
  }

  _throttle.cancel = () => {
    timer && clearTimeout(timer);
  };
  return _throttle;
};

export { debounce, throttle };
