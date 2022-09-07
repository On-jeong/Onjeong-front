import axios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchQuest = () => {
  return axios.get(`/questions`);
};

const fetchAnswers = () => {
  return axios.get(`/answers`);
};

const addAnswer = questData => {
  return axios.post(`/answers/register`, questData);
};

const modifyAnswer = questData => {
  return axios.put(`/answers`, questData);
};

const deleteAnswer = () => {
  return axios.delete(`/answers`);
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
export const useAddAnswer = questData => {
  return useMutation(addAnswer(questData), {
    onError: error => console.log(error),
  });
};

// 이주의 문답 답변 수정하기
export const useModifyAnswer = questData => {
  return useMutation(modifyAnswer(questData), {
    onError: error => console.log(error),
  });
};

// 이주의 문답 답변 삭제하기
export const useDeleteAnswer = () => {
  return useMutation(deleteAnswer(), {
    onError: error => console.log(error),
  });
};
