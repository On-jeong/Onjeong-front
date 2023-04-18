import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useQueryClient} from '@tanstack/react-query';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppButtons} from '@/components/buttons';
import {useAddAnn, useDeleteAnn} from '@/hooks/useAnniversaryData';
import {Filter} from '@/screens/mail/MailScreen';
import {AppIcons} from '@/ui/icons';
import {AppComponents} from '@/components/Components';
import {AppContainer} from '@/components/container';
import {AppList} from '@/components/lists';
import {BackHandler, Vibration} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const PlanBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const SendBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

export const PlanTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  margin-bottom: 6px;
`;

const PlanTextBox = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  margin-top: 5px;
  border-bottom-width: 1px;
  border-bottom-color: ${AppColors.Gray400};
`;

const PlanText = styled.TextInput`
  height: 30px;
  min-width: 110px;
  padding: 0;
  margin-left: 10px;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

export const getId = ({data, id}) => {
  if (data.length === 0) return 0;
  else return data[data.length - 1].id + 1;
};

const TodayPlan = ({date, AnnData}) => {
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const [isAddPlan, setIsAddPlan] = useState(false);
  const [isDelPlan, setIsDelPlan] = useState(false);
  const [newPlan, setNewPlan] = useState('');
  const [isAnniversary, setIsAnniversary] = useState(false);

  // 백핸들러
  useEffect(() => {
    handlePressBack();
    return () => handlePressBack();
  }, [isDelPlan]);

  const handlePressBack = () => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (isDelPlan) {
        setIsDelPlan(false);
        return true;
      }
      navigation.navigate('CalendarTab');
      return true;
    });
  };

  const {mutate: addAnn} = useAddAnn({
    onMutate: () => {
      setIsAddPlan(false);

      // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
      queryClient.cancelQueries(['getDateAnn', date]);

      // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
      const rollbackData = queryClient.getQueryData(['getDateAnn', date]);

      queryClient.setQueryData(['getDateAnn', date], oldData => {
        return [
          ...oldData,
          {
            anniversaryContent: newPlan,
            anniversaryDate: date,
            anniversaryId: getId({data: oldData, id: 'anniversaryId'}),
            anniversaryType: isAnniversary ? 'ANNIVERSARY' : 'SPECIAL_SCHEDULE',
          },
        ];
      });
      // 실패시 되돌릴 데이터 리턴
      return {rollbackData};
    },
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => {
      // 받아왔던 기념일 데이터 리패치
      queryClient.invalidateQueries('getDateAnn', date);
    },
  });

  const {mutate: delAnn} = useDeleteAnn({
    onMutate: value => {
      // 이전에 자동 요청된 데이터 등으로 overwrite 되지 않도록
      queryClient.cancelQueries(['getDateAnn', date]);

      // 실패했을 경우 롤백을 해야 하므로 원래의 데이터를 저장한다.
      const rollbackData = queryClient.getQueryData(['getDateAnn', date]);

      // 성공 가정하고 UI 미리 적용
      queryClient.setQueryData(['getDateAnn', date], oldData => {
        return oldData.filter(it => it.anniversaryId !== value.annId);
      });

      // 실패시 되돌릴 데이터 리턴
      return {rollbackData};
    },
    onError: (err, value, context) => onError(err, value, context),
    onSettled: () => {
      // 받아왔던 기념일 데이터 리패치
      queryClient.invalidateQueries('getDateAnn', date);
    },
  });

  const onError = (err, value, context) => {
    queryClient.setQueryData(['getDateAnn', date], context.rollbackData);

    console.log('일정 에러', err);
  };

  const addPlan = () => {
    if (newPlan === '') {
      alert('내용을 입력해 주세요.');
      return 0;
    }
    console.log('종류', isAnniversary);
    addAnn({
      annDate: date,
      annData: {
        anniversaryContent: newPlan,

        //SPECIAL_SCHEDULE / ANNIVERSARY
        anniversaryType: isAnniversary ? 'ANNIVERSARY' : 'SPECIAL_SCHEDULE',
      },
    });
  };

  return (
    <>
      <AppContainer.Basic>
        <PlanTitle>
          <AppFonts.SubTitle>오늘의 일정</AppFonts.SubTitle>
          <Filter>
            {/* 삭제 버튼 */}
            {AnnData?.length !== 0 && (
              <>
                <AppComponents.IconButton
                  icon={<AppIcons.Trash />}
                  padding={{padding: 8, paddingRight: 12}}
                  onPress={() => {
                    setIsDelPlan(!isDelPlan);
                    if (isAddPlan && !isDelPlan) setIsAddPlan(!isAddPlan);
                    Vibration.vibrate(5);
                  }}
                />
              </>
            )}

            {/* 추가 버튼 */}
            <AppComponents.IconButton
              icon={<AppIcons.Add />}
              padding={{padding: 8, paddingLeft: 12}}
              onPress={() => {
                setNewPlan('');
                setIsAddPlan(!isAddPlan);
                setIsAnniversary(false);
                if (!isAddPlan && isDelPlan) setIsDelPlan(!isDelPlan);
              }}
            />
          </Filter>
        </PlanTitle>

        <AppContainer.Paper padding={{padding: 20, paddingLeft: 20}}>
          {AnnData?.length === 0 && !isAddPlan && (
            <AppFonts.Body2 color={AppColors.Gray600}>
              오늘의 일정이 없습니다.
            </AppFonts.Body2>
          )}

          {/* 오늘의 일정 리스트 */}
          {AnnData?.map(ann => (
            <PlanBox key={ann.anniversaryId}>
              {isDelPlan ? (
                <AppComponents.IconButton
                  icon={<AppIcons.CancelSmall />}
                  padding={{padding: 10}}
                  onPress={() => {
                    delAnn({annId: ann.anniversaryId});
                  }}
                />
              ) : (
                <AppComponents.IconBox
                  icon={<AppIcons.Dot />}
                  padding={{paddingRight: 10}}
                />
              )}

              <AppFonts.Body1 bold={ann.anniversaryType === 'ANNIVERSARY'}>
                {ann.anniversaryContent}
              </AppFonts.Body1>
            </PlanBox>
          ))}

          {/* 기념일 추가 */}
          {isAddPlan && (
            <>
              <PlanTextBox>
                <AppIcons.Dot />
                <PlanText
                  value={newPlan}
                  onChangeText={setNewPlan}
                  maxLength={10}
                />
              </PlanTextBox>
              <AppComponents.Row justifyContent={'space-between'}>
                <SendBox>
                  <AppList.CheckList
                    check={isAnniversary}
                    title={'기념일'}
                    onPress={() => setIsAnniversary(true)}
                  />
                  <AppComponents.EmptyBox width={7} />
                  <AppList.CheckList
                    check={!isAnniversary}
                    title={'일정'}
                    onPress={() => setIsAnniversary(false)}
                  />
                </SendBox>
                <SendBox>
                  <AppButtons.SmallButton
                    title="취소"
                    onPress={() => setIsAddPlan(false)}
                    margin={{margin: 5}}
                    color={AppColors.Gray200}
                  />
                  <AppButtons.SmallButton
                    title="추가"
                    onPress={() => {
                      addPlan();
                    }}
                    margin={{margin: 5}}
                    color={AppColors.Primary}
                  />
                </SendBox>
              </AppComponents.Row>
            </>
          )}
        </AppContainer.Paper>
      </AppContainer.Basic>
    </>
  );
};

export default TodayPlan;
