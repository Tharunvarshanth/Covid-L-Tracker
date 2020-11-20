import {Alert} from 'react-native';

const CreateAlert = (msg) => {
  Alert.alert(
    '',
    msg,
    [
      {
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
};

export default CreateAlert;
