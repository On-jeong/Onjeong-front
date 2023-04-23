import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  startOfWeek,
} from 'date-fns';
import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {BasicHeader} from '../components/headers/WithHeader';
import {AppFonts} from '../utils/GlobalFonts';
import {AppColors, windowWidth} from '../utils/GlobalStyles';
import {useFocusEffect} from '@react-navigation/native';
import {useGetMonthAnn} from '../hooks/useAnniversaryData';
import {useQueryClient} from '@tanstack/react-query';
import {AppComponents} from '@/components/Components';
import {AppContainer} from '@/components/container';
import {AppIcons} from '@/ui/icons';
import WheelPicker from 'react-native-wheely';
import CalendarBody from './calendar/CalendarBody';
import {AppModal} from '@/components/modal';
import {useRecoilState} from 'recoil';
import {CurDateState, CurMonthState, CurYearState} from '@/state/CalandarData';
import {AppButtons} from '@/components/buttons';

const PaperContainer = styled.View`
  flex: 1;
  align-items: center;
  padding-left: ${windowWidth * 0.05};
  padding-right: ${windowWidth * 0.05};
`;

const Title = styled.TouchableOpacity`
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const Days = styled.View`
  height: 30px;
  flex-direction: row;
`;

const DateBox = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  padding: 4px;
  overflow: hidden;
`;

const MonthPickerBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.View`
  margin-left: 10px;
  margin-right: 10px;
`;

const MonthTextBox = styled.View`
  margin-left: 10px;
`;

const BottomButton = styled.TouchableOpacity`
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
`;

export default function CalendarScreen() {
  const queryClient = useQueryClient();

  const [curDateState, setCurDateState] = useRecoilState(CurDateState);
  const [curMonthState, setCurMonthState] = useRecoilState(CurMonthState);
  const [curYearState, setCurYearState] = useRecoilState(CurYearState);

  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [pickYear, setPickYear] = useState(getYear(curDateState)); // 피커에서 선택한 년도 (임시저장)
  const [pickMonth, setPickMonth] = useState(getMonth(curDateState) + 1); // 피커에서 선택한 월 (임시저장)

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const years = [
    -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ].map(idx => curYearState + idx);

  const {
    data: annData,
    isLoading,
    isError,
    refetch,
  } = useGetMonthAnn(format(curDateState, 'yyyy-MM-dd'));

  useEffect(() => {
    getCurMonthDays(curYearState, curMonthState);
  }, []);

  // 페이지 리로딩
  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries([
        'getMonthAnn',
        format(curDateState, 'yyyy-MM-dd'),
      ]);
    }, []),
  );

  // 선택한 월별 dates 구하기
  const getCurMonthDays = (year, month) => {
    // month는 0부터 시작하므로 -1
    const monthStart = startOfWeek(new Date(year, month - 1)); // 월 시작 주의 첫번째 날짜 (이전 달 일 수 있음)
    const monthEnd = endOfWeek(endOfMonth(new Date(year, month - 1))); // 월 마지막 주의 7번째 날짜 (이전 달 일 수 있음)

    const monthList = [];
    let weekList = [];
    let date = monthStart;

    while (date <= monthEnd) {
      for (let i = 0; i < 7; i++) {
        // 한 주에 하루씩 추가
        weekList.push({
          date: date,
          isCurMonth: getMonth(date) === month - 1,
          annData: annData,
        });

        date = addDays(date, 1); // 다음날로 변경
      }

      monthList.push(weekList); // month에 한 주 추가
      weekList = []; // 한 주 초기화
    }

    return monthList;
  };

  return (
    <>
      <BasicHeader
        title="가족 달력"
        isError={isError}
        reloadFunc={() => refetch()}>
        <PaperContainer>
          <AppContainer.Paper padding={{paddingBottom: 10}}>
            <Title
              onPress={() => {
                setMonthPickerOpen(true);
              }}>
              <AppFonts.SubTitle>
                {curYearState + '년 ' + curMonthState + '월  '}
                <AppIcons.Down />
              </AppFonts.SubTitle>
            </Title>
            <Days>
              {days.map(day => (
                <DateBox key={day}>
                  <AppFonts.Body2>{day}</AppFonts.Body2>
                </DateBox>
              ))}
            </Days>
            <CalendarBody
              monthDays={getCurMonthDays(curYearState, curMonthState)}
              annData={annData}
            />
          </AppContainer.Paper>
        </PaperContainer>
      </BasicHeader>

      {/* 년, 월 선택 모달 */}
      <AppModal.EmptyModal
        modalVisible={monthPickerOpen}
        setModalVisible={setMonthPickerOpen}
        height={220}>
        <MonthPickerBox>
          <WheelPicker
            selectedIndex={curYearState - getYear(curDateState) + 10}
            options={years}
            selectedIndicatorStyle={{backgroundColor: AppColors.Primary}}
            onChange={index => {
              setPickYear(years[index]);
            }}
            visibleRest={1}
          />
          <TextBox>
            <AppFonts.SubTitle>년</AppFonts.SubTitle>
          </TextBox>
          <AppComponents.EmptyBox width={10} />
          <WheelPicker
            selectedIndex={curMonthState - 1}
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            selectedIndicatorStyle={{
              backgroundColor: AppColors.Primary,
              width: 48,
            }}
            onChange={index => {
              setPickMonth(index + 1);
            }}
            visibleRest={1}
          />
          <MonthTextBox>
            <AppFonts.SubTitle>월</AppFonts.SubTitle>
          </MonthTextBox>
        </MonthPickerBox>
        <BottomButton
          onPress={() => {
            setMonthPickerOpen(false);
            setCurMonthState(pickMonth);
            setCurYearState(pickYear);
            setCurDateState(new Date(pickYear, pickMonth - 1));
          }}>
          <AppFonts.Body1>확인</AppFonts.Body1>
        </BottomButton>
      </AppModal.EmptyModal>
    </>
  );
}
