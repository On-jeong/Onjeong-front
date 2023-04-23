import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchMonthAnn = annDate => {
  return customAxios.get(`/months/anniversaries/${annDate}`).then(data => data?.data?.data);
};

const fetchDateAnn = annDate => {
  return customAxios
    .get(`/days/anniversaries/${annDate}`)
    .then(data => data?.data?.data);
};

const addAnn = ({annDate, annData}) => {
  console.log('부름!!!!!');

  console.log('annDate', annDate);
  console.log('annData', annData);
  return customAxios.post(`/days/anniversaries/${annDate}`, annData);
};

const deleteAnn = ({annId}) => {
  return customAxios.delete(`/days/anniversaries/${annId}`);
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
export const useAddAnn = ({onMutate, onError, onSettled}) => {
  return useMutation(addAnn, {
    onMutate: onMutate,
    onError: onError,
    onSettled: onSettled,
  });
};

// 해당 특수일정 삭제하기
export const useDeleteAnn = ({onMutate, onError, onSettled}) => {
  return useMutation(deleteAnn, {
    onMutate: onMutate,
    onError: onError,
    onSettled: onSettled,
  });
};
