import axios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchTodayBoards = boardDate => {
  return axios.get(`/boards/${boardDate}`);
};

const fetchBoardDetail = BoardId => {
  return axios.get(`/boards/${BoardId}/one`);
};

const addBoard = ({boardDate, formData}) => {
  console.log(formData);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post(
    `/boards/${boardDate}`,
    formData,
    config,
  );
};

const deleteBoard = BoardId => {
  return axios.delete(`/boards/${BoardId}`);
};

const modifyBoard = (BoardId, BoardData) => {
  return axios.patch(`/boards/${BoardId}`, BoardData);
};

// 오늘의 기록 모두 가져오기
export const useGetTodayBoards = boardDate => {
  return useQuery(
    ['getTodayBoards', boardDate],
    () => fetchTodayBoards(boardDate),
    {
      onError: error => console.log(error),
    },
  );
};

// 오늘의 기록 자세히보기
export const useGetBoardDetail = BoardId => {
  return useQuery(
    ['getBoardDetail', BoardId],
    () => fetchBoardDetail(BoardId),
    {
      onError: error => console.log(error),
    },
  );
};

// 오늘의 기록 작성하기
export const useAddBoard = onSuccess => {
  return useMutation(addBoard, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 오늘의 기록 삭제하기
export const useDeleteBoard = ({onSuccess}) => {
  return useMutation(deleteBoard, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
  });
};

// 오늘의 기록 수정하기
export const useModifyBoard = () => {
  return useMutation(modifyBoard, {
    onError: error => console.log(error),
  });
};
