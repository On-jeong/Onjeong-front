import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchTodayBoards = boardDate => {
  return axios.get(`${API}/boards/${boardDate}`);
};

const fetchBoardDetail = BoardId => {
  return axios.get(`${API}/boards/${BoardId}/one`);
};

const addBoard = ({boardDate, formData}) => {
  console.log(formData);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.post(
    `${API}/boards/${boardDate}`,
    formData,
    config,
  );
};

const deleteBoard = BoardId => {
  return axios.delete(`${API}/boards/${BoardId}`);
};

const modifyBoard = (BoardId, BoardData) => {
  return axios.patch(`${API}/boards/${BoardId}`, BoardData);
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
