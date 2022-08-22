import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchMonthAnn = anniversaryDate => {
  return axios.get(`${API}
  /anniversaries/${anniversaryDate}`);
};

const fetchDateAnn = anniversaryDate => {
  return axios.get(`${API}
  /anniversaries/days/${anniversaryDate}`);
};

const addAnn = (anniversaryDate, annData) => {
  return axios.post(`${API}/anniversaries/days/${anniversaryDate}`, annData);
};

const deleteAnn = anniversaryId => {
  return axios.delete(`${API}/anniversaries/days/${anniversaryId}`);
};

const modifyAnn = (anniversaryId,annData) => {
  return axios.put(`${API}/anniversaries/days/${anniversaryId}`,annData);
};

// 월별 모든 특수일정 불러오기
export const useGetMonthAnn = anniversaryDate => {
  return useQuery(['getMonthAnn'], fetchMonthAnn(anniversaryDate), {
    onError: error => console.log(error),
  });
};

// 해당 일의 특수일정 불러오기
export const useGetDateAnn = anniversaryDate => {
  return useQuery(['getDateAnn'], fetchDateAnn(anniversaryDate), {
    onError: error => console.log(error),
  });
};

// 해당 일의 특수일정 등록하기
export const useAddAnn = () => {
  return useMutation(addAnn, {
    onError: error => console.log(error),
  });
};

// 해당 특수일정 삭제하기
export const useDeleteAnn = () => {
  return useMutation(deleteAnn, {
    onError: error => console.log(error),
  });
};

// 해당 특수일정 수정하기
export const useModifyAnn = () => {
  return useMutation(modifyAnn, {
    onError: error => console.log(error),
  });
};
