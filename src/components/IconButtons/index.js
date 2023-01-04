import React from 'react';
import {TouchableOpacity} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import PropTypes from 'prop-types';
import {AppColors} from '@/utils/GlobalStyles';

const Pencil = ({
  disabled = true,
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
  disabled = true,
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
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Ionicons
        name="alert-circle-outline"
        color={AppColors.font}
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
  disabled = true,
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
        color={AppColors.dark}
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
  disabled = true,
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
    <TouchableOpacity onPress={onPress} disabled={disabled}>
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

const LeftArrow = ({onPress, disabled = true, active = false, size = 20}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <MaterialIcons
        name="keyboard-arrow-left"
        size={size}
        color={active ? AppColors.border : AppColors.font}
      />
    </TouchableOpacity>
  );
};
LeftArrow.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const RightArrow = ({onPress, disabled = true, active = false, size = 20}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <MaterialIcons
        name="keyboard-arrow-right"
        size={size}
        color={active ? AppColors.border : AppColors.font}
      />
    </TouchableOpacity>
  );
};
RightArrow.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const Bell = ({onPress, disabled = true, active = false, size = 20}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Fontisto
        name="bell"
        size={size}
        color={active ? AppColors.border : AppColors.font}
      />
    </TouchableOpacity>
  );
};
Bell.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const User = ({onPress, disabled = true, active = false, size = 20}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Feather
        name="user"
        size={size}
        color={active ? AppColors.border : AppColors.font}
      />
    </TouchableOpacity>
  );
};
User.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const ReLoad = ({onPress, disabled = true, active = false, size = 20}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <AntDesign
        name="reload1"
        size={size}
        color={active ? AppColors.border : AppColors.font}
      />
    </TouchableOpacity>
  );
};
ReLoad.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const AlertCircle = ({onPress, disabled = true, active = false, size = 20}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Ionicons
        name="alert-circle"
        size={size}
        color={active ? AppColors.border : AppColors.font}
      />
    </TouchableOpacity>
  );
};
AlertCircle.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const Down = ({onPress, disabled = true, active = false, size = 20}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <AntDesign
        name="down"
        size={size}
        color={active ? AppColors.border : AppColors.font}
      />
    </TouchableOpacity>
  );
};
Down.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const Check = ({
  onPress,
  disabled = true,
  active = false,
  size = 20,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Octicons
        name="check"
        size={size}
        color={active ? AppColors.border : AppColors.font}
        style={style}
      />
    </TouchableOpacity>
  );
};
Check.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const PaperClip = ({
  onPress,
  disabled = true,
  active = false,
  size = 20,
  style,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <EvilIcons
        name="paperclip"
        size={size}
        color={active ? AppColors.border : AppColors.font}
        style={style}
      />
    </TouchableOpacity>
  );
};
PaperClip.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

const Back = ({onPress, disabled = true, active = false, size = 20, style}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Entypo
        name="chevron-left"
        size={size}
        color={active ? AppColors.border : AppColors.font}
        style={style}
      />
    </TouchableOpacity>
  );
};
Back.propTypes = {
  onPress: PropTypes.func,
  size: PropTypes.number,
  padding: PropTypes.objectOf(PropTypes.number),
};

export const AppIconButtons = {
  Pencil,
  Alert,
  Cancel,
  Delete,
  LeftArrow,
  RightArrow,
  Bell,
  User,
  ReLoad,
  AlertCircle,
  Down,
  Check,
  PaperClip,
  Back,
};
