import React, {useState} from 'react';
import styled from 'styled-components';
import NoHeader from '@/components/NoHeader';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {FontStyle} from '@/utils/GlobalFonts';
import {MainInput, Paper, PaperContainer} from '@/screens/mail/MailWriteScreen';
import {useAddBoard, useModifyBoard} from '../../hooks/useBoardData';
import {useQueryClient} from '@tanstack/react-query';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {windowWidth} from '../../utils/GlobalStyles';
import {AppButtons} from '../../components/buttons';
import {AppIconButtons} from '../../components/IconButtons';

export const SendBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const SendBtn = styled.TouchableOpacity`
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

export const ImageBox = styled.View`
  margin-top: 10px;
`;

export const IconBox = styled.View`
  position: absolute;
  top: -10px;
  left: -10px;
`;

export const PreImage = styled.Image`
  width: ${windowWidth * 0.3};
  height: ${windowWidth * 0.3};
`;

const PostWriteScreen = ({navigation, route}) => {
  const queryClient = useQueryClient();

  console.log(route.params)

  // 수정에서 넘어온 경우 기존 컨텐츠 보여주기
  const [mainText, setMainText] = useState(
    route.params.boardContent ? route.params.boardContent : '',
  );
  const [image, setImage] = useState(route.params.boardImageUrl);

  const {mutate: addBoard} = useAddBoard({
    onSuccess: () => {
      // 받아왔던 포스트 데이터 리패치
      queryClient.invalidateQueries('getTodayBoards', route.params.barDate);
      navigation.navigate('Post', {
        date: route.params.date,
        barDate: route.params.barDate,
      });
    },
  });
  const {mutate: modBoard} = useModifyBoard({
    onSuccess: () => {
      // 받아왔던 포스트 데이터 리패치
      queryClient.invalidateQueries('getTodayBoards', route.params.barDate);
      navigation.navigate('Post', {
        date: route.params.date,
        barDate: route.params.barDate,
      });
    },
  });

  const getImage = async () => {
    const data = await launchImageLibrary({
      mediaTypes: 'photo',
      maxWidth: 600,
      maxHeight: 600,
      rotation: 360,
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
    formData.append('boardContent', mainText);

    // 수정인 경우
    if (route.params.boardId) {
      modBoard({boardId: route.params.boardId, formData});
    }
    // 새로운 포스트인 경우
    else {
      addBoard({boardDate: route.params.barDate, formData});
    }
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
