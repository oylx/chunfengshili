import Toast from './MbsToast';
import { titleMap, iconsMap } from './config';

export const ToastPlugin = {
  install(Vue) {
    const ToastConstructor = Vue.extend(Toast);
    Vue.prototype.$toast = function () {
      if (!arguments[0]) return;
      const propsData = buildProps(arguments);
      const instance = new ToastConstructor({ propsData });
      // 注意{ propsData, methods }等价于{ propsData: propsData, methods: methods }
      // 打印出{ propsData }为: {propsData: { autoClose: true, message: "操作成功"} }
      document.body.appendChild(instance.$mount().$el);
    };

    function buildProps(args) {
      let props = {};
      props.message = args[0];
      if (args[1]) {
        const { type = 'info', position = 'topCenter', closeTime = 3, autoClose = true, width = 300, height = 80, callback, } = args[1];
        props = { ...props, type, position, closeTime, autoClose, width, height };
        props.callback = callback ? callback : null;
      }
      props.title = titleMap[props.type];
      props.icon = iconsMap[props.type];
      return props;
    }

  },
};
