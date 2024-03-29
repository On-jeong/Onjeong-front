import customAxios from '@/api/axios';
import Confirm from '@/components/alert/Alert';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchQuest = () => {
  return customAxios.get(`/questions`).then(data => data?.data?.data);
};

const fetchAnswers = () => {
  return customAxios.get(`/answers`).then(data => data?.data?.data);
};

const addAnswer = questData => {
  return customAxios.post(`/answers/register?answerContent=${questData}`);
};

const modifyAnswer = questData => {
  return customAxios.put(`/answers`, questData);
};

const deleteAnswer = questData => {
  return customAxios.delete(`/answers/${questData}`);
};

// 이주의 문답 질문 보여주기
export const useGetQuest = () => {
  return useQuery(['getQuest'], fetchQuest, {
    onError: error => console.log(error),
  });
};

// 이주의 문답 답변들 보여주기
export const useGetAnswers = onSuccess => {
  return useQuery(['getAnswers'], fetchAnswers, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 이주의 문답 답변 작성하기
export const useAddAnswer = ({onMutate, onSettled}) => {
  return useMutation(addAnswer, {
    onError: error => {
      Confirm('알림', '문답 작성 중 오류가 발생했습니다.');
      console.log('문답작성에러:', error);
    },
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

// 이주의 문답 답변 수정하기
export const useModifyAnswer = ({onMutate, onSettled}) => {
  return useMutation(modifyAnswer, {
    onError: error => {
      Confirm('알림', '문답 수정 중 오류가 발생했습니다.');
      console.log('문답수정에러:', error);
    },
    onMutate: onMutate,
    onSettled: onSettled,
  });
};

// 이주의 문답 답변 삭제하기
export const useDeleteAnswer = ({onMutate, onSettled}) => {
  return useMutation(deleteAnswer, {
    onError: error => {
      Confirm('알림', '문답 삭제 중 오류가 발생했습니다.');
      console.log('문답삭제에러:', error);
    },
    onMutate: onMutate,
    onSettled: onSettled,
  });
};
