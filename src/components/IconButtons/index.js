import React from 'react';
import {TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';

const Pencil = ({
  onPress,
  size = 18,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <SimpleLineIcons
        name="pencil"
        size={size}
        style={{
          marginTop: margin.marginTop,
          marginBottom: margin.marginBottom,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}
      />
    </TouchableOpacity>
  );
};
Pencil.PropTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  margin: {
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
  },
};

const Alert = ({
  onPress,
  size = 16,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="alert-circle-outline"
        size={size}
        style={{
          marginTop: margin.marginTop,
          marginBottom: margin.marginBottom,
          marginLeft: margin.marginLeft,
          marginRight: margin.marginRight,
        }}
      />
    </TouchableOpacity>
  );
};
Alert.PropTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  margin: {
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
  },
};

export const AppIconButtons = {
  Pencil,
  Alert,
};
