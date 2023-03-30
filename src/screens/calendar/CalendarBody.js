import {AppComponents} from '@/components/Components';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors, windowHeightNoNav} from '@/utils/GlobalStyles';
import {
  format,
  getDate,
} from 'date-fns';
import React from 'react';
import styled from 'styled-components';

const Calendar = styled.View`
  width: 100%;
  height: ${windowHeightNoNav * 0.9 - 20 - 80}px;
  align-items: center;
`;

const Week = styled.View`
  flex: 1;
  flex-direction: row;
`;

const DateBox = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  overflow: hidden;
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

export default function CalendarBody({navigation, monthDays}) {
  const today = new Date();

  return (
    <>
      <Calendar>
        {monthDays.map((week, idx) => (
          <Week key={idx}>
            {week.map(date => {
              return (
                <DateBox
                  key={date.date}
                  onPress={() => {
                    navigation.navigate('Post', {
                      date: format(date.date, 'yyyy년 MM월 dd일'),
                      barDate: format(date.date, 'yyyy-MM-dd'),
                    });
                  }}>
                  {date.isCurMonth && (
                    <>
                      {/* 오늘인 경우 원으로 표시하기 */}
                      <AppComponents.Circle
                        width={23}
                        height={20}
                        color={
                          format(date.date, 'yy-MM-dd') == today &&
                          date.isCurMonth
                            ? AppColors.Primary
                            : null
                        }>
                        <AppFonts.Body2>{getDate(date.date)}</AppFonts.Body2>
                      </AppComponents.Circle>
                      {/* 기념일은 3개까지만 들어감 */}
                      {/* {annData?.data?.data.map(
                            plan =>
                              plan.anniversaryDate == format(date, 'yyyy-MM-dd') && (
                                // 기념일은 빨간색, 일정은 파란색으로 표시
                                <MiniText
                                  type={plan.anniversaryType}
                                  key={plan.anniversaryId}>
                                  <AppFonts.CalendarFont
                                    numberOfLines={1}
                                    ellipsizeMode="tail">
                                    {plan.anniversaryContent}
                                  </AppFonts.CalendarFont>
                                </MiniText>
                              ),
                          )} */}
                    </>
                  )}
                </DateBox>
              );
            })}
          </Week>
        ))}
      </Calendar>
    </>
  );
}
