import {AppIcons} from '@/ui/icons';
import {AppFonts} from '@/utils/GlobalFonts';
import React from 'react';
import styled from 'styled-components';
import {AppComponents} from '../Components';

const List = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const CheckList = ({check, onPress, title}) => {
  return (
    <List
      onPress={onPress}>
      {check ? (
        <AppComponents.IconBox
          icon={<AppIcons.CheckBox />}
          padding={{padding: 4}}
        />
      ) : (
        <AppComponents.IconBox
          icon={<AppIcons.CheckBoxEmpty />}
          padding={{padding: 4}}
        />
      )}
      <AppFonts.Body2>{title}</AppFonts.Body2>
    </List>
  );
};

export default CheckList;
