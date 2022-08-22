import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchMonthAnn = annDate => {
  return axios.get(`${API}/anniversaries/${annDate}`);
};

const fetchDateAnn = annDate => {
  return axios.get(`${API}/anniversaries/days/${annDate}`);
};

const addAnn = ({annDate: annDate, annData}) => {
  return axios.post(`${API}/anniversaries/days/${annDate}`, annData);
};

const deleteAnn = annId => {
  return axios.delete(`${API}/anniversaries/days/${annId}`);
};

const modifyAnn = (annId, annData) => {
  return axios.put(`${API}/anniversaries/days/${annId}`, annData);
};

// 월별 모든 특수일정 불러오기
export const useGetMonthAnn = annDate => {
  return useQuery(['getMonthAnn', annDate], () => fetchMonthAnn(annDate), {
    onError: error => console.log(error),
  });
};

// 해당 일의 특수일정 불러오기
export const useGetDateAnn = annDate => {
  return useQuery(['getDateAnn', annDate], () => fetchDateAnn(annDate), {
    onError: error => console.log(error),
  });
};

// 해당 일의 특수일정 등록하기
export const useAddAnn = ({onSuccess}) => {
  return useMutation(addAnn, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 해당 특수일정 삭제하기
export const useDeleteAnn = ({onSuccess}) => {
  return useMutation(deleteAnn, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 해당 특수일정 수정하기
export const useModifyAnn = () => {
  return useMutation(modifyAnn, {
    onError: error => console.log(error),
  });
};
