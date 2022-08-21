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

const SubTitle = styled.Text`
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

const CalendarFont = styled.Text`
  font-family: 'GangwonBold';
  font-size: 12px;
  color: ${props => (props.color ? props.color : AppColors.font)};
`;

export const FontStyle = {
  Big,
  Title,
  SubTitle,
  Content,
  ContentB,
  SubContent,
  CalendarFont,
};
