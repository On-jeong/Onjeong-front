import styled from 'styled-components';
import {AppColors} from './GlobalStyles';

const Big = styled.Text`
  font-family: 'GangwonBold';
  font-size: 30px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const Title = styled.Text`
  font-family: 'GangwonBold';
  font-size: 25px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const TitleB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 25px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const SubTitle = styled.Text`
  font-family: 'GangwonLight';
  font-size: 23px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const SubTitleB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 23px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const Content = styled.Text`
  font-family: ${props => (props?.bold ? 'GangwonBold' : 'GangwonLight')};
  font-size: 20px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const ContentB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 20px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const SubContent = styled.Text`
  font-family: 'GangwonLight';
  font-size: 15px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const SubContentB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 15px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const CalendarFont = styled.Text`
  font-family: 'GangwonBold';
  font-size: 12px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

// new fonts
const Heading = styled.Text`
  font-family: 'GangwonBold';
  font-size: 20px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const Subtitle = styled.Text`
  font-family: 'GangwonBold';
  font-size: 16px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const Body1 = styled.Text`
  font-family: 'GangwonLight';
  font-size: 16px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const Body2 = styled.Text`
  font-family: 'GangwonLight';
  font-size: 14px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

const Caption = styled.Text`
  font-family: 'GangwonLight';
  font-size: 12px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

export const AppFonts = {
  Big,
  Title,
  TitleB,
  SubTitle,
  SubTitleB,
  Content,
  ContentB,
  SubContent,
  SubContentB,
  CalendarFont,
  Heading,
  Subtitle,
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
