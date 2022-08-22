import axios from 'axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {API} from '@/config/api';

const fetchReceiveMails = () => {
  return axios.get(`${API}/mailList/receive`);
};

const fetchSendMails = () => {
  return axios.get(`${API}/mailList/send`);
};

const postMailData = mailData => {
  return axios.post(`${API}/mails`, mailData);
};

const fetchMailDetail = mailId => {
  return axios.get(`${API}/mails/${mailId}`);
};

const deleteReceiveMail = mailIds => {
  return axios.post(`${API}/mails/receive/delete?mailIds=${mailIds}`);
};

const deleteSendMail = mailIds => {
  return axios.post(`${API}/mails/send/delete?mailIds=${mailIds}`);
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
export const useGetSendMails = () => {
  return useQuery(['getSendMails'], fetchSendMails, {
    onError: error => console.log(error),
    refetchOnMount: true,
  });
};

// 메일 보내기
export const usePostMail = navigation => {
  return useMutation(postMailData, {
    onError: error => console.log(error),
    onSuccess: () => {
      navigation.navigate('Mail');
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
export const useDeleteReceiveMail = () => {
  return useMutation(deleteReceiveMail, {
    onError: error => console.log(error),
  });
};

// 보낸 메일 삭제
export const useDeleteSendMail = () => {
  return useMutation(deleteSendMail, {
    onError: error => console.log(error),
  });
};
