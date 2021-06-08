import CustomInput from './CustomInput';
import ValidateHoc from './Hoc.js';

const ValidateInput = ValidateHoc(CustomInput);

export default {
  name: 'ValidateInput1',
  render() {
    return <ValidateInput/>;
  },
};
