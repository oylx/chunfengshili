/**
 * 1. 添加全局方法或属性
 */
// export default {
//   install(Vue, options) {
//     Vue.$myName = 'xiami'
//   }
// }

/**
 * 2.添加全局资源：指令/过滤器/过渡等，如 vue-touch
 */
// export default {
//   install(Vue, options) {
//     if(this.installed) return;
//     this.installed = true;
//     Vue.directive('focus', {
//       bind: function () {},
//       inserted: function (el,binding, vnode,oldVnode) {
//         el.focus()
//       },
//       update:function (){},
//       componentUpdated: function () {
//
//       },
//       unbind: function (){}
//     });
//   },
// };

/**
 * 3. 通过全局 mixin方法添加一些组件选项，如: vuex
 */
// export default {
//   install(Vue, options) {
//     Vue.mixin({
//       methods: {
//         greetingFn() {
//           console.log('greeting');
//         }
//       }
//     });
//   },
// }

/**
 * 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
 */
// export default {
//   install(Vue, options) {
//     Vue.prototype.$myName = '劳卜';
//     Vue.prototype.showMyName = value => {
//       console.log(value);
//     };
//   },
// }

export default {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        notify(content, options){

        }
      }
    })
  }
}
