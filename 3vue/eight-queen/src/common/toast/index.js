import Toast from './MbsToast';
import { titleMap, iconsMap } from './config'

export const ToastPlugin = {
  install(Vue) {
    const ToastConstructor = Vue.extend(Toast);
    Vue.prototype.$toast = toast;

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
      return props
    }

    function toast() {
      if (!arguments[0]) return;
      const propsData = buildProps(arguments);
      const instance = new ToastConstructor({ propsData });
      document.body.appendChild(instance.$mount().$el);
    }

  },
};
