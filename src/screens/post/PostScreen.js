import React from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {FontStyle} from '@/utils/GlobalFonts';
import {AppColors, windowHeight} from '@/utils/GlobalStyles';
import {HorizonLine} from '../MyScreen';
import {TouchableOpacity} from 'react-native';
import { Components } from '../../utils/Components';

const PlanBox = styled.View`
  padding: 7%;
`;

const PlanTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Paper = styled.View`
  width: 100%;
  height: ${windowHeight * 0.2};
  border-width: 2px;
  border-color: ${AppColors.border};
  background-color: ${AppColors.white};
  padding: 20px;
  padding-top: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const PostScreen = ({navigation, route}) => {
  return (
    <NoHeader title={route.params.date} isBack={true} navigation={navigation}>
      <>
        <Components.HorizonLine />
        <PlanBox>
          <PlanTitle>
            <FontStyle.SubTitle>오늘의 행사</FontStyle.SubTitle>
          </PlanTitle>
          <FontStyle.ContentB>1. 엄마 생신</FontStyle.ContentB>
          <FontStyle.ContentB>2. 바다 여행</FontStyle.ContentB>
        </PlanBox>
        <Components.HorizonLine />
        <PlanBox>
          <PlanTitle>
            <FontStyle.SubTitle>오늘의 기록</FontStyle.SubTitle>
            <TouchableOpacity>
              <SimpleLineIcons
                name="pencil"
                size={18}
                style={{marginRight: 8}}
                onPress={() => {
                  navigation.navigate('PostWrite', {date: route.params.date});
                }}
              />
            </TouchableOpacity>
          </PlanTitle>
          <Paper></Paper>
        </PlanBox>
      </>
    </NoHeader>
  );
};
export default PostScreen;
