import MailWhite from '@/assets/icons/mail_white.svg';
import MailBlack from '@/assets/icons/mail_black.svg';
import QuestWhite from '@/assets/icons/quest_white.svg';
import QuestBlack from '@/assets/icons/quest_black.svg';
import ProfileWhite from '@/assets/icons/profile_white.svg';
import ProfileBlack from '@/assets/icons/profile_black.svg';
import CalendarWhite from '@/assets/icons/calendar_white.svg';
import CalendarBlack from '@/assets/icons/calendar_black.svg';
import HomeWhite from '@/assets/icons/home_white.svg';
import HomeBlack from '@/assets/icons/home_black.svg';
import Right from '@/assets/icons/right.svg';
import Right_gray from '@/assets/icons/right_gray.svg';
import Back from '@/assets/icons/back.svg';
import Back_gray from '@/assets/icons/back_gray.svg';
import Down from '@/assets/icons/down.svg';

import Add from '@/assets/icons/add.svg';
import Bell from '@/assets/icons/bell.svg';
import List from '@/assets/icons/list.svg';
import Setting from '@/assets/icons/setting.svg';
import Trash from '@/assets/icons/trash.svg';

import Water from '@/assets/icons/water.svg';
import Flower from '@/assets/icons/flower.svg';

import PropTypes from 'prop-types';
import React from 'react';
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
  Right_gray,
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
