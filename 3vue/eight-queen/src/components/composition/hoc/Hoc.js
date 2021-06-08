import Vue from 'vue';

const ValidateHoc = Component => {
  return Vue.component(`hoc-${Component.name}`, {
    data: () => ({ errMsg: '' }),
    methods: {
      validate() {
        console.log('validate');
      },
      render() {
        return (
          <div>
            <Component on-blur={this.validate}/>
            {this.errMsg}
          </div>
        );
      },
    },
  });
};
export default ValidateHoc;
