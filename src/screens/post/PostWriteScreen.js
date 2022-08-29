import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {FontStyle} from '@/utils/GlobalFonts';
import {MainInput, Paper, PaperContainer} from '@/screens/mail/MailWriteScreen';
import {useAddBoard} from '../../hooks/useBoardData';
import {useQueryClient} from '@tanstack/react-query';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {windowWidth} from '../../utils/GlobalStyles';
import {AppButtons} from '../../components/buttons';
import {AppIconButtons} from '../../components/IconButtons';

const SendBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const SendBtn = styled.TouchableOpacity`
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

const ImageBox = styled.View`
  margin-top: 10px;
`;

const IconBox = styled.View`
  position: absolute;
  top: -10px;
  left: -10px;
`;

const PreImage = styled.Image`
  width: ${windowWidth * 0.3};
  height: ${windowWidth * 0.3};
`;

const PostWriteScreen = ({navigation, route}) => {
  const queryClient = useQueryClient();

  const [mainText, setMainText] = useState('');
  const [image, setImage] = useState(null);

  const {mutate} = useAddBoard();

  const getImage = async () => {
    const data = await launchImageLibrary({
      mediaTypes: 'photo',
    });

    // 이미지 업로드 취소한 경우
    if (data.cancelled) {
      return 0;
    }

    // 에러 발생
    if (data.errorMessage) {
      console.log(data.errorMessage);
    }

    setImage(data.assets[0].uri);
  };

  const sendPost = () => {
    const formData = new FormData();

    formData.append('images', image);

    mutate(
      {boardDate: route.params.barDate, boardContent: mainText, formData},
      {
        onSuccess: () => {
          // 받아왔던 포스트 데이터 리패치
          queryClient.invalidateQueries('getTodayBoards', route.params.barDate);
          navigation.navigate('Post', {
            date: route.params.date,
            barDate: route.params.barDate,
          });
        },
      },
    );
  };

  return (
    <NoHeader title={route.params.date} isBack={true} navigation={navigation}>
      <>
        <PaperContainer>
          <Paper>
            {image && (
              <ImageBox>
                <PreImage source={{uri: image}} />
                <IconBox>
                  <AppIconButtons.Cancel
                    onPress={() => {
                      setImage(null);
                    }}
                  />
                </IconBox>
              </ImageBox>
            )}
            <MainInput
              multiline={true}
              numberOfLines={20}
              textAlignVertical="top"
              value={mainText}
              onChangeText={setMainText}
            />
          </Paper>
          <SendBox>
            <SendBtn
              onPress={() => {
                getImage();
              }}>
              <EvilIcons name="paperclip" size={22} />
              <FontStyle.SubContent>첨부파일</FontStyle.SubContent>
            </SendBtn>
            <SendBtn
              onPress={() => {
                sendPost();
              }}>
              <FontStyle.ContentB>작성</FontStyle.ContentB>
            </SendBtn>
          </SendBox>
        </PaperContainer>
      </>
    </NoHeader>
  );
};

export default PostWriteScreen;
