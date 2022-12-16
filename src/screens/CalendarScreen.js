import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {WithHeader} from '../components/WithHeader';
import {FontStyle} from '../utils/GlobalFonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AppColors,
  bottomTabHeight,
  navigationHeight,
  statusBarHeight,
  windowHeight,
  windowWidth,
} from '../utils/GlobalStyles';
import {useIsFocused} from '@react-navigation/native';
import {useGetMonthAnn} from '../hooks/useAnniversaryData';

const Calendar = styled.View`
  width: 100%;
  height: 80%;
  align-items: center;
`;

const DateBox = styled.TouchableOpacity`
  width: ${windowWidth / 7}px;
  height: ${(windowHeight -
    navigationHeight -
    bottomTabHeight -
    statusBarHeight) /
  6}px;
  padding: 4px;
  border-width: 0.6px;
  border-color: ${AppColors.blur};
  overflow: hidden;
`;

const Circle = styled.View`
  width: 25px;
  height: 25px;
  margin-bottom: 2px;
  border-radius: 50px;
  background-color: ${props => (props.color ? AppColors.main : AppColors.body)};
  justify-content: center;
  align-items: center;
`;

const MiniText = styled.View`
  justify-content: center;
  align-items: center;
  padding: 1px;
  margin-top: 2px;
  border-width: 1px;
  border-radius: 12px;
  border-color: ${props =>
    props.type === 'ANNIVERSARY' ? AppColors.red1 : AppColors.green2};
`;

const Week = styled.View`
  flex-direction: row;
`;

export default function CalendarScreen({navigation}) {
  const isFocus = useIsFocused();
  const [curDate, setCurDate] = useState(new Date());

  const {data, isLoading, isError} = useGetMonthAnn(
    format(curDate, 'yyyy-MM-dd'),
  );

  useEffect(() => {}, [isFocus, data]);

  return (
    <>
      {getCalender({curDate, setCurDate, navigation, data, isLoading, isError})}
    </>
  );
}

// 달력
const getCalender = ({
  curDate,
  setCurDate,
  navigation,
  data,
  isLoading,
  isError,
}) => {
  const monthStart = startOfMonth(curDate); //이번 달 시작 날짜
  const monthEnd = endOfMonth(curDate); //이번 달 마지막 날짜
  const startDate = startOfWeek(monthStart); // 이번 달 시작 주의 첫번째 날짜
  const endDate = endOfWeek(monthEnd); // 이번 달 마지막 주의 마지막 날짜
  const curMonth = getMonth(curDate) + 1; // 이번 달
  const curYear = getYear(curDate); // 이번 달
  const today = format(new Date(), 'yy-MM-dd');

  let date = startDate;
  let month = [];
  let week = [];

  while (date <= endDate) {
    for (let i = 0; i < 7; i++) {
      // 하루씩 추가
      week = pushDate({week, date, curMonth, today, navigation, data});

      date = addDays(date, 1); // 다음날
    }
    month.push(<Week key={date}>{week}</Week>); // 한 주 추가
    week = []; // 한 주 초기화
  }


  return (
    <>
      <WithHeader
        isLoading={isLoading}
        isError={isError}
        title={curYear + '년 ' + curMonth + '월'}
        leftIcon={<MaterialIcons name="keyboard-arrow-left" size={30} />}
        rightIcon2={<MaterialIcons name="keyboard-arrow-right" size={30} />}
        leftOnPress={() => {
          setCurDate(subMonths(curDate, 1));
          getCalender({curDate});
        }}
        rightOnPress2={() => {
          setCurDate(addMonths(curDate, 1));
          getCalender({curDate});
        }}>
        <Calendar>{month}</Calendar>
      </WithHeader>
    </>
  );
};

const pushDate = ({week, date, curMonth, today, navigation, data}) => {
  let formattedDate = format(date, 'd'); // 날짜만 format
  let formattedMonth = date.getMonth() + 1;
  let formattedDay = date.getDay();

  // 색깔 지정
  let color = AppColors.black;
  if (formattedMonth == curMonth) {
    // 이번 달 일 경우
    if (formattedDay == 0) color = '#DD4A48';
    else if (formattedDay == 6) color = '#35589A';
  } else color = AppColors.blur; // 이번 달이 아닐 경우

  week.push(
    <DateBox
      key={date}
      onPress={() => {
        navigation.navigate('Post', {
          date: format(date, 'yyyy년 MM월 dd일'),
          barDate: format(date, 'yyyy-MM-dd'),
        });
      }}>
      {/* 오늘인 경우 원으로 표시하기 */}
      <Circle color={format(date, 'yy-MM-dd') == today ? true : false}>
        <FontStyle.ContentB style={{color: color}}>
          {formattedDate}
        </FontStyle.ContentB>
      </Circle>
      {/* 기념일은 3개까지만 들어가게 하기 */}
      {data?.data?.data.map(
        plan =>
          plan.anniversaryDate == format(date, 'yyyy-MM-dd') && (
            // 기념일은 빨간색, 일정은 파란색으로 표시
            <MiniText type={plan.anniversaryType} key={plan.anniversaryId}>
              <FontStyle.CalendarFont numberOfLines={1} ellipsizeMode="tail">
                {plan.anniversaryContent}
              </FontStyle.CalendarFont>
            </MiniText>
          ),
      )}
    </DateBox>,
  );
  return week;
};
