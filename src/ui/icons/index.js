import MailWhite from '@/assets/icons/Icon_mail_white.svg';
import MailBlack from '@/assets/icons/Icon_mail_black.svg';
import QuestWhite from '@/assets/icons/Icon_quest_white.svg';
import QuestBlack from '@/assets/icons/Icon_quest_black.svg';
import ProfileWhite from '@/assets/icons/Icon_profile_white.svg';
import ProfileBlack from '@/assets/icons/Icon_profile_black.svg';
import CalendarWhite from '@/assets/icons/Icon_calendar_white.svg';
import CalendarBlack from '@/assets/icons/Icon_calendar_black.svg';
import HomeWhite from '@/assets/icons/Icon_home_white.svg';
import HomeBlack from '@/assets/icons/Icon_home_black.svg';
import Right from '@/assets/icons/right.svg';
import Back from '@/assets/icons/back.svg';
import Back_gray from '@/assets/icons/back_gray.svg';
import Down from '@/assets/icons/down.svg';

import Add from '@/assets/icons/Icon_add.svg';
import Bell from '@/assets/icons/Icon_bell.svg';
import List from '@/assets/icons/Icon_list.svg';
import Setting from '@/assets/icons/Icon_setting.svg';
import Trash from '@/assets/icons/Icon_trash.svg';

import Water from '@/assets/icons/water.svg';
import Flower from '@/assets/icons/flower.svg';

import PropTypes from 'prop-types';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const AppIcons = {
  MailWhite,
  MailBlack,
  QuestWhite,
  QuestBlack,
  ProfileWhite,
  ProfileBlack,
  CalendarWhite,
  CalendarBlack,
  HomeWhite,
  HomeBlack,
  Add,
  Bell,
  List,
  Setting,
  Trash,
  Water,
  Flower,
  Right,
  Back,
  Down,
  Back_gray,
};

const IconBox = styled.TouchableOpacity`
  padding: 5px;
`;

export const IconButton = ({icon, onPress, disabled = false}) => {
  return (
    <IconBox onPress={onPress} disabled={disabled}>
      {icon}
    </IconBox>
  );
};
IconButton.propTypes = {
  icon: PropTypes.element,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};
