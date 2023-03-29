import styled from 'styled-components';
import {AppColors} from './GlobalStyles';

const Big = styled.Text`
  font-family: 'GangwonBold';
  font-size: 30px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Title = styled.Text`
  font-family: 'GangwonBold';
  font-size: 25px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const TitleB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 25px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const SubTitleB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 23px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Content = styled.Text`
  font-family: ${props => (props?.bold ? 'GangwonBold' : 'GangwonLight')};
  font-size: 20px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const ContentB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 20px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const SubContent = styled.Text`
  font-family: 'GangwonLight';
  font-size: 15px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const SubContentB = styled.Text`
  font-family: 'GangwonBold';
  font-size: 15px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const CalendarFont = styled.Text`
  font-family: 'GangwonBold';
  font-size: 12px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

// new fonts
const Heading = styled.Text`
  font-family: 'Gaegu-Bold';
  font-size: 21px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const SubTitle = styled.Text`
  font-family: 'Gaegu-Bold';
  font-size: 17px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Body1 = styled.Text`
  font-family: 'Gaegu-Regular';
  font-size: 17px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Body2 = styled.Text`
  font-family: 'Gaegu-Regular';
  font-size: 15px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

const Caption = styled.Text`
  font-family: 'Gaegu-Regular';
  font-size: 13px;
  color: ${props => (props.color ? props.color : AppColors.Font)};
`;

export const AppFonts = {
  Big,
  Title,
  TitleB,
  SubTitleB,
  Content,
  ContentB,
  SubContent,
  SubContentB,
  CalendarFont,
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
