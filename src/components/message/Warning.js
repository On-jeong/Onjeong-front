import React from 'react';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppComponents} from '../Components';
import {AppIcons} from '@/ui/icons';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Warning = ({
  title,
  padding = {
    padding: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}) => {
  return (
    <Container
      style={{
        padding: padding.padding,
        paddingTop: padding.paddingTop,
        paddingBottom: padding.paddingBottom,
        paddingLeft: padding.paddingLeft,
        paddingRight: padding.paddingRight,
      }}>
      <AppComponents.IconBox
        icon={<AppIcons.WarningGray />}
        padding={{paddingRight: 5}}
      />
      <AppFonts.Caption color={AppColors.Gray700}>{title}</AppFonts.Caption>
    </Container>
  );
};

export default Warning;
