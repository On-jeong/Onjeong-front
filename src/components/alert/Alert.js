import {Alert} from 'react-native';


const Confirm = (title, text) => {
  Alert.alert(title, text, [{text: '확인'}]);
};

export default Confirm;
