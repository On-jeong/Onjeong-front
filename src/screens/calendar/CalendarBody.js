import {AppComponents} from '@/components/Components';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors, windowHeightNoNav} from '@/utils/GlobalStyles';
import {format, getDate} from 'date-fns';
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
  padding: 1px;
  align-items: center;
  overflow: hidden;
`;

const MiniText = styled.View`
  justify-content: center;
  align-items: center;
  padding: 2px;
  margin-top: 2px;
  border-color: ${props =>
    props.type === 'ANNIVERSARY' ? AppColors.red1 : AppColors.green2};
  background-color: ${AppColors.Secondary};
`;

export default function CalendarBody({navigation, monthDays}) {
  const today = new Date();

  return (
    <>
      <Calendar>
        {monthDays.map((week, idx) => (
          <Week key={idx}>
            {week.map(date => {
              const formatDate = format(date.date, 'yyyy-MM-dd');
              return (
                <DateBox
                  key={date.date}
                  onPress={() => {
                    navigation.navigate('Post', {
                      date: format(date.date, 'yyyy년 MM월 dd일'),
                      barDate: formatDate,
                    });
                  }}>
                  {date.isCurMonth && (
                    <>
                      {/* 오늘인 경우 원으로 표시하기 */}
                      <AppComponents.Circle
                        width={23}
                        height={20}
                        color={
                          formatDate == format(today, 'yyyy-MM-dd') &&
                          date.isCurMonth
                            ? AppColors.Primary
                            : null
                        }>
                        <AppFonts.Body2>{getDate(date.date)}</AppFonts.Body2>
                      </AppComponents.Circle>
                      {/* 기념일은 최대 3개까지만 들어감 */}
                      {date.annData &&
                        date.annData[formatDate] &&
                        date.annData[formatDate].map(plan => (
                          <MiniText
                            type={plan.anniversaryType}
                            key={plan.anniversaryId}>
                            <AppFonts.Caption
                              numberOfLines={1}
                              ellipsizeMode="tail">
                              {plan.anniversaryContent}
                            </AppFonts.Caption>
                          </MiniText>
                        ))}
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

