import customAxios from '@/api/axios';
import Confirm from '@/components/alert/Alert';
import {useMutation, useQuery} from '@tanstack/react-query';

const fetchReceiveMails = () => {
  return customAxios.get(`/mailList/receive`).then(data => data?.data?.data);
};

const fetchSendMails = () => {
  return customAxios.get(`/mailList/send`).then(data => data?.data?.data);
};

const postMailData = mailData => {
  return customAxios.post(`/mails`, mailData);
};

const fetchMailDetail = mailId => {
  return customAxios.get(`/mails/${mailId}`);
};

const deleteReceiveMail = mailIds => {
  return customAxios.post(`/mails/receive/delete?mailIds=${mailIds}`);
};

const deleteSendMail = mailIds => {
  return customAxios.post(`/mails/send/delete?mailIds=${mailIds}`);
};

// 받은 메일 리스트 데이터 불러오기
export const useGetReceiveMails = ({onSuccess}) => {
  return useQuery(['getReceiveMails'], fetchReceiveMails, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
    refetchOnMount: true,
  });
};

// 보낸 메일 리스트 데이터 불러오기
export const useGetSendMails = ({onSuccess}) => {
  return useQuery(['getSendMails'], fetchSendMails, {
    onError: error => console.log(error),
    onSuccess: onSuccess,
    refetchOnMount: true,
  });
};

// 메일 보내기
export const usePostMail = ({onSuccess}) => {
  return useMutation(postMailData, {
    onSuccess: onSuccess,
    onError: error => {
      console.log(error);
      Confirm('알림', '편지를 보내는 중 오류가 발생했습니다');
    },
  });
};

// 특정 메일 데이터 불러오기
export const useGetMailDetail = mailId => {
  return useQuery(['getMailDetail', mailId], fetchMailDetail(mailId), {
    onError: error => console.log(error),
  });
};

// 받은 메일 삭제
export const useDeleteReceiveMail = ({onSuccess}) => {
  return useMutation(deleteReceiveMail, {
    onSuccess: onSuccess,
    onError: error => console.log(error),
  });
};

// 보낸 메일 삭제
export const useDeleteSendMail = ({onSuccess}) => {
  return useMutation(deleteSendMail, {
    onSuccess: onSuccess,
    onError: error => console.log(error),
  });
};
