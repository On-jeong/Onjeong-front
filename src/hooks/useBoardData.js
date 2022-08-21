import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchTodayBoards = boardDate => {
  return axios.get(`${API}/boards/${boardDate}
  `);
};

const fetchBoardDetail = BoardId => {
  return axios.get(`${API}/boards/${BoardId}/one`);
};

const addBoard = (boardDate, BoardData) => {
  return axios.post(`${API}/boards/${boardDate}`, BoardData);
};

const deleteBoard = BoardId => {
  return axios.delete(`${API}/boards/${BoardId}`);
};

const modifyBoard = (BoardId, BoardData) => {
  return axios.patch(`${API}/boards/${BoardId}`, BoardData);
};

// 오늘의 기록 모두 가져오기
export const useGetTodayBoards = boardDate => {
  return useQuery(['getTodayBoards'], fetchTodayBoards(boardDate), {
    onError: error => console.log(error),
  });
};

// 오늘의 기록 자세히보기
export const useGetBoardDetail = boardDate => {
  return useQuery(['getBoardDetail'], fetchBoardDetail(boardDate), {
    onError: error => console.log(error),
  });
};

// 오늘의 기록 작성하기
export const useAddBoard = BoardId => {
  return useMutation(addBoard(BoardId), {
    onError: error => console.log(error),
  });
};

// 오늘의 기록 삭제하기
export const useDeleteBoard = BoardId => {
  return useMutation(deleteBoard(BoardId), {
    onError: error => console.log(error),
  });
};

// 오늘의 기록 수정하기
export const useModifyBoard = BoardId => {
  return useMutation(modifyBoard(BoardId), {
    onError: error => console.log(error),
  });
};
