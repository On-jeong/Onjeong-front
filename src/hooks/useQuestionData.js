import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchQuest = () => {
  return customAxios.get(`/questions`);
};

const fetchAnswers = () => {
  return customAxios.get(`/answers`);
};

const addAnswer = questData => {
  return customAxios.post(`/answers/register`, questData);
};

const modifyAnswer = questData => {
  return customAxios.put(`/answers`, questData);
};

const deleteAnswer = () => {
  return customAxios.delete(`/answers`);
};

// 이주의 문답 질문 보여주기
export const useGetQuest = () => {
  return useQuery(['getQuest'], fetchQuest, {
    onError: error => console.log(error),
  });
};

// 이주의 문답 답변들 보여주기
export const useGetAnswers = () => {
  return useQuery(['getAnswers'], fetchAnswers, {
    onError: error => console.log(error),
  });
};

// 이주의 문답 답변 작성하기
export const useAddAnswer = onSuccess => {
  return useMutation(addAnswer, {
    onError: error => console.log(error),
    onSuccess:onSuccess
  });
};

// 이주의 문답 답변 수정하기
export const useModifyAnswer = () => {
  return useMutation(modifyAnswer, {
    onError: error => console.log(error),
  });
};

// 이주의 문답 답변 삭제하기
export const useDeleteAnswer = () => {
  return useMutation(deleteAnswer(), {
    onError: error => console.log(error),
  });
};
