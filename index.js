/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';

//  fcm -  background
//  remoteMessage.data로 메세지에 접근가능
//  remoteMessage.from 으로 topic name 또는 message identifier
//  remoteMessage.messageId 는 메시지 고유값 id
//  remoteMessage.notification 메시지와 함께 보내진 추가 데이터
//  remoteMessage.sentTime 보낸시간
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('background 알림 : ', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
