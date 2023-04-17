import styled from 'styled-components';
import {AppColors} from './GlobalStyles';

const Heading = styled.Text`
  font-family: 'GangwonBold';
  font-size: 21px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const SubTitle = styled.Text`
  font-family: 'GangwonBold';
  font-size: 17px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Body1 = styled.Text`
  font-family: 'GangwonLight';
  font-size: 17px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Body2 = styled.Text`
  font-family: 'GangwonLight';
  font-size: 16px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Caption = styled.Text`
  font-family: 'GangwonLight';
  font-size: 14px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

export const AppFonts = {
  Heading,
  SubTitle,
  Body1,
  Body2,
  Caption,
};

const Bold = 'GangwonBold';
const Light = 'GangwonLight';

export const FontFamily = {
  Bold,
  Light,
};
