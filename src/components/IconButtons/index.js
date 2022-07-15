import React from 'react';
import {TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const Pencil = ({onPress, size = 18, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <SimpleLineIcons name="pencil" size={size} style={style} />
    </TouchableOpacity>
  );
};
Pencil.PropTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.any,
};

const Alert = ({onPress, size = 16, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons name="alert-circle-outline" size={size} style={style} />
    </TouchableOpacity>
  );
};
Alert.PropTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.any,
};

export const AppIconButtons = {
  Pencil,
  Alert,
};
