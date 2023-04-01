import React, {useState} from 'react';
import styled from 'styled-components';
import {useQueryClient} from '@tanstack/react-query';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppColors} from '@/utils/GlobalStyles';
import {AppIconButtons} from '@/components/IconButtons';
import {AppButtons} from '@/components/buttons';
import {useAddAnn, useDeleteAnn} from '@/hooks/useAnniversaryData';
import {Filter} from '@/screens/mail/MailScreen';
import {SpaceBetween} from '@/screens/QaScreen';
import {AppIcons} from '@/ui/icons';
import {AppComponents} from '@/components/Components';
import {AppContainer} from '@/components/container';

const PlanBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const ChoiceBox = styled.TouchableOpacity`
  margin-right: 8px;
  flex-direction: row;
  align-items: center;
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
  border-bottom-color: ${AppColors.border};
`;

const PlanText = styled.TextInput`
  height: 30px;
  min-width: 110px;
  padding: 0;
  font-family: 'GangwonLight';
  font-size: 20px;
  line-height: 30px;
`;

export const getId = ({data, id}) => {
  if (data.length === 0) return 0;
  else return data[data.length - 1].id + 1;
};

const TodayPlan = ({date, AnnData}) => {
  const queryClient = useQueryClient();

  const [isAddPlan, setIsAddPlan] = useState(false);
  const [isDelPlan, setIsDelPlan] = useState(false);
  const [newPlan, setNewPlan] = useState('');
  const [isAnniversary, setIsAnniversary] = useState(true);

  const {mutate: addAnn} = useAddAnn({
    onMutate: () => {
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
      console.log('????????');
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
                if (!isAddPlan && isDelPlan) setIsDelPlan(!isDelPlan);
              }}
            />
          </Filter>
        </PlanTitle>

        <AppContainer.Paper
          padding={{padding: 20, paddingLeft: 20}}
          height={'auto'}>
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
                  icon={<AppIcons.Cancel size={15} />}
                  padding={{paddingRight: 10}}
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

              <AppFonts.Body2 bold={ann.anniversaryType === 'ANNIVERSARY'}>
                {ann.anniversaryContent}
              </AppFonts.Body2>
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
                  maxLength={15}
                />
              </PlanTextBox>
              <SpaceBetween>
                <SendBox>
                  <ChoiceBox onPress={() => setIsAnniversary(true)}>
                    {isAnniversary ? (
                      <AppIconButtons.CheckBox disabled={true} />
                    ) : (
                      <AppIconButtons.EmptyCheckBox disabled={true} />
                    )}
                    <AppFonts.Body2>기념일</AppFonts.Body2>
                  </ChoiceBox>
                  <ChoiceBox onPress={() => setIsAnniversary(false)}>
                    {!isAnniversary ? (
                      <AppIconButtons.CheckBox disabled={true} />
                    ) : (
                      <AppIconButtons.EmptyCheckBox disabled={true} />
                    )}
                    <AppFonts.Body2>일정</AppFonts.Body2>
                  </ChoiceBox>
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
                      setIsAddPlan(false);
                    }}
                    margin={{margin: 5}}
                    color={AppColors.Primary}
                  />
                </SendBox>
              </SpaceBetween>
            </>
          )}
        </AppContainer.Paper>
      </AppContainer.Basic>
    </>
  );
};

export default TodayPlan;
