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
import WithHeader from '../components/WithHeader';
import {FontStyle} from '../utils/GlobalFonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AppColors,
  bottomTabHeight,
  navigationHeight,
  windowHeight,
  windowWidth,
} from '../utils/GlobalStyles';
import {useIsFocused} from '@react-navigation/native';

const Calendar = styled.View`
  width: 100%;
  height: 80%;
  align-items: center;
`;

const DateBox = styled.View`
  width: ${windowWidth / 7};
  height: ${(windowHeight - navigationHeight - bottomTabHeight) / 6};
  padding: 4px;
  border-width: 1px;
  border-color: ${AppColors.blur};
  margin-left: -1px;
  margin-top: -1px;
`;

const Week = styled.View`
  flex-direction: row;
`;

export default function CalendarScreen() {
  const isFocus = useIsFocused();
  const [curDate, setCurDate] = useState(new Date());
  const [curMonth, setCurMonth] = useState(getMonth(curDate) + 1);
  const [curYear, setCurYear] = useState(getYear(curDate));

  useEffect(() => {}, [isFocus, curMonth]);

  // 달력
  const getCalender = ({curDate}) => {
    const monthStart = startOfMonth(curDate); //이번 달 시작 날짜
    const monthEnd = endOfMonth(curDate); //이번 달 마지막 날짜
    const startDate = startOfWeek(monthStart); // 이번 달 시작 주의 첫번째 날짜
    const endDate = endOfWeek(monthEnd); // 이번 달 마지막 주의 마지막 날짜
    const curMonth = getMonth(curDate) + 1; // 이번 달
    const curYear = getYear(curDate); // 이번 달

    let date = startDate;
    let month = [];
    let week = [];

    while (date <= endDate) {
      for (let i = 0; i < 7; i++) {
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

        // 하루 추가
        week.push(
          <DateBox>
            <FontStyle.ContentB style={{color: color}}>
              {formattedDate}
            </FontStyle.ContentB>
          </DateBox>,
        );
        date = addDays(date, 1); // 다음날
      }
      month.push(<Week>{week}</Week>); // 한 주 추가
      week = []; // 한 주 초기화
    }

    return (
      <>
        <WithHeader
          title={curYear + '년 ' + curMonth + '월'}
          leftIcon={<MaterialIcons name="keyboard-arrow-left" size={30} />}
          rightIcon2={<MaterialIcons name="keyboard-arrow-right" size={30} />}
          leftOnPress={() => {
            setCurDate(subMonths(curDate, 1));
            setCurYear(getYear(curDate));
            setCurMonth(getMonth(curDate));
            getCalender({curDate});
          }}
          rightOnPress2={() => {
            setCurDate(addMonths(curDate, 1));
            setCurYear(getYear(curDate));
            setCurMonth(getMonth(curDate));
            getCalender({curDate});
          }}>
          <Calendar>{month}</Calendar>
        </WithHeader>
      </>
    );
  };

  return <>{getCalender({curDate})}</>;
}
