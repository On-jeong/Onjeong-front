import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchQuest = () => {
  return axios.get(`${API}/questions`);
};

const fetchAnswers = () => {
  return axios.get(`${API}/answers`);
};

const addAnswer = questData => {
  return axios.post(`${API}/answers/register`, questData);
};

const modifyAnswer = questData => {
  return axios.put(`${API}/answers`, questData);
};

const deleteAnswer = () => {
  return axios.delete(`${API}/answers`);
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
