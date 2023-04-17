import React, {useState} from 'react';
import styled from 'styled-components';
import {AppFonts} from '@/utils/GlobalFonts';
import {PaperContainer} from '@/screens/mail/MailWriteScreen';
import {useAddBoard, useModifyBoard} from '../../hooks/useBoardData';
import {useQueryClient} from '@tanstack/react-query';
import {launchImageLibrary} from 'react-native-image-picker';
import {windowWidth} from '../../utils/GlobalStyles';
import {WithHeader} from '@/components/headers/WithHeader';
import {AppInputs} from '@/components/inputs';
import {AppButtons} from '@/components/buttons';
import {ScrollView} from 'react-native';
import {AppComponents} from '@/components/Components';
import {format} from 'date-fns';
import {AppIcons} from '@/ui/icons';

export const SendBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

export const SendBtn = styled.TouchableOpacity`
  margin: 5px;
  flex-direction: row;
  align-items: center;
`;

export const ImageBox = styled.View`
  width: 100%;
  margin-top: 5px;
  align-items: flex-end;
`;

export const IconBox = styled.TouchableOpacity`
  position: absolute;
  padding: 10px;
  top: 0px;
  left: 0px;
`;

export const PreImage = styled.Image`
  width: ${windowWidth * 0.3}px;
  height: ${windowWidth * 0.3}px;
`;

const PostWriteScreen = ({navigation, route}) => {
  const formatDate = format(route.params.date, 'yyyy-MM-dd');

  const queryClient = useQueryClient();

  // 수정에서 넘어온 경우 기존 컨텐츠 보여주기
  const [mainText, setMainText] = useState(
    route.params.boardContent ? route.params.boardContent : '',
  );
  const [image, setImage] = useState(route.params.boardImageUrl);

  const {mutate: addBoard, isLoading: addIsLoading} = useAddBoard({
    onSuccess: () => {
      // 받아왔던 포스트 데이터 리패치
      queryClient.invalidateQueries('getTodayBoards', formatDate);
      navigation.navigate('Post', {
        date: route.params.date,
      });
    },
  });
  const {mutate: modBoard, isLoading: modIsLoading} = useModifyBoard({
    onSuccess: () => {
      // 받아왔던 포스트 데이터 리패치
      queryClient.invalidateQueries('getTodayBoards', formatDate);
      navigation.navigate('Post', {
        date: route.params.date,
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

    // 이미지 파일 형태로 state에 저장
    setImage(data.assets[0].uri);
  };

  const sendPost = () => {
    const formData = new FormData();

    formData.append('boardContent', mainText);

    if (image) {
      // uri 마지막 부분에서 image name 추출하기
      // 수정일 경우 이미지 uri 정보밖에 없으므로 uri에서 name을 알아내는 과정이 필요함
      let imgName = image.split('/');
      imgName = imgName[imgName.length - 1];

      formData.append('images', {
        uri: image,
        name: imgName,
        type: 'image/jpeg',
      });
    }

    // 수정인 경우
    if (route.params.boardId) {
      modBoard({boardId: route.params.boardId, formData});
    }
    // 새로운 포스트인 경우
    else {
      addBoard({boardDate: formatDate, formData});
    }
  };

  return (
    <>
      <WithHeader
        title={format(route.params.date, 'yyyy년 M월 d일')}
        isLoading={addIsLoading || modIsLoading}
        isBack={true}>
        <ScrollView>
          <PaperContainer>
            <AppInputs.PaperInput
              image={image}
              mainText={mainText}
              setMainText={setMainText}
              padding={{padding: 10}}
            />
            <SendBox>
              {image ? (
                <SendBtn
                  onPress={() => {
                    setImage(null);
                  }}>
                  <AppIcons.CancelSmall style={{marginRight: 5}} />
                  <AppFonts.Body1>사진삭제</AppFonts.Body1>
                </SendBtn>
              ) : (
                <SendBtn
                  onPress={() => {
                    getImage();
                  }}>
                  <AppIcons.Add style={{marginRight: 5}} />
                  <AppFonts.Body1>사진추가</AppFonts.Body1>
                </SendBtn>
              )}
            </SendBox>
            {image && (
              <ImageBox>
                <PreImage source={{uri: image}} />
              </ImageBox>
            )}
            <AppComponents.EmptyBox height={20} />
          </PaperContainer>
        </ScrollView>
      </WithHeader>
      <AppButtons.FullButton
        title="작성"
        disabled={mainText == ''}
        onPress={() => {
          sendPost();
        }}
      />
    </>
  );
};

export default PostWriteScreen;
