import {View, Text} from 'react-native';
import React from 'react';

const AlertScreen = () => {
  return (
    <BasicHeader title={'온정'} isBack={true} navigation={navigation}>
      <Text>MyScreen</Text>
    </BasicHeader>
  );
};

export default AlertScreen;
