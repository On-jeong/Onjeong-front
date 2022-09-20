import React from 'react';
import {TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
Pencil.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  margin: PropTypes.objectOf(PropTypes.number),
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
Alert.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  margin: PropTypes.objectOf(PropTypes.number)
};

const Cancel = ({
  onPress,
  size = 22,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name="cancel"
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
Cancel.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  margin: PropTypes.objectOf(PropTypes.number)
};

const Delete = ({
  onPress,
  size = 20,
  margin = {marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign
        name="delete"
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
Delete.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  margin: PropTypes.objectOf(PropTypes.number)
};

export const AppIconButtons = {
  Pencil,
  Alert,
  Cancel,
  Delete,
};
