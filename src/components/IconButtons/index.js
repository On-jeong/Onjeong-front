import React from 'react';
import {TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {AppColors} from '@/utils/GlobalStyles';

const Pencil = ({
  disabled = false,
  active = false,
  onPress,
  size = 18,
  padding = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <SimpleLineIcons
        name="pencil"
        color={active ? AppColors.border : AppColors.font}
        size={size}
        style={{
          padding: padding.padding,
          paddingTop: padding.paddingTop,
          paddingBottom: padding.paddingBottom,
          paddingLeft: padding.paddingLeft,
          paddingRight: padding.paddingRight,
        }}
      />
    </TouchableOpacity>
  );
};
Pencil.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const Alert = ({
  onPress,
  size = 16,
  padding = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="alert-circle-outline"
        size={size}
        style={{
          padding: padding.padding,
          paddingTop: padding.paddingTop,
          paddingBottom: padding.paddingBottom,
          paddingLeft: padding.paddingLeft,
          paddingRight: padding.paddingRight,
        }}
      />
    </TouchableOpacity>
  );
};
Alert.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const Cancel = ({
  onPress,
  disabled = false,
  size = 22,
  padding = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <MaterialIcons
        name="cancel"
        size={size}
        style={{
          padding: padding.padding,
          paddingTop: padding.paddingTop,
          paddingBottom: padding.paddingBottom,
          paddingLeft: padding.paddingLeft,
          paddingRight: padding.paddingRight,
        }}
      />
    </TouchableOpacity>
  );
};
Cancel.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const Delete = ({
  onPress,
  active = false,
  size = 20,
  padding = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign
        name="delete"
        size={size}
        color={active ? AppColors.border : AppColors.font}
        style={{
          padding: padding.padding,
          paddingTop: padding.paddingTop,
          paddingBottom: padding.paddingBottom,
          paddingLeft: padding.paddingLeft,
          paddingRight: padding.paddingRight,
        }}
      />
    </TouchableOpacity>
  );
};
Delete.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

export const AppIconButtons = {
  Pencil,
  Alert,
  Cancel,
  Delete,
};
