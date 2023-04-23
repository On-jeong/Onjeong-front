import customAxios from '@/api/axios';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchTodayBoards = boardDate => {
  return customAxios.get(`/boards/all/${boardDate}`).then(data => data?.data?.data);
}

const fetchBoardDetail = boardId => {
  return customAxios.get(`/boards/${boardId}/one`).then(data => data?.data?.data);
};

const addBoard = ({boardDate, formData}) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return customAxios.post(`/boards/${boardDate}`, formData, config);
};

const deleteBoard = boardId => {
  return customAxios.delete(`/boards/${boardId}`);
};

const modifyBoard = ({boardId, formData}) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return customAxios.put(`/boards/${boardId}`, formData, config);
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
export const useAddBoard = ({onSuccess}) => {
  return useMutation(addBoard, {
    onError: error => alert('게시물 작성에 실패했습니다.'),
    onSuccess: onSuccess,
  });
};

// 오늘의 기록 삭제하기
export const useDeleteBoard = ({onSuccess}) => {
  return useMutation(deleteBoard, {
    onError: error => alert('게시물 삭제에 실패했습니다.'),
    onSuccess: onSuccess,
  });
};

// 오늘의 기록 수정하기
export const useModifyBoard = ({onSuccess}) => {
  return useMutation(modifyBoard, {
    onError: error => alert('게시물 수정에 실패했습니다.'),
    onSuccess: onSuccess,
  });
};
