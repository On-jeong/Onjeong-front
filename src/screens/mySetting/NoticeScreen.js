import React from 'react';
import {WithHeader} from '@/components/headers/WithHeader';
import {Menu, MenuContainer} from './MyScreen';
import {AppFonts} from '@/utils/GlobalFonts';
import {AppIcons} from '@/ui/icons';
import {MessageBox, MessageContent} from '../AlertScreen';
import {AppComponents} from '@/components/Components';
import {AppContainer} from '@/components/container';

const NoticeScreen = () => {
  return (
    <WithHeader title={'공지사항'} isBack={true}>
      <AppContainer.Basic>
        <MessageBox>
          <MessageContent>
            <AppComponents.IconBox
              icon={<AppIcons.FlowerGray />}
              padding={{paddingRight: 8}}
            />
            <AppFonts.Body2>온정에 오신 것을 환영합니다!</AppFonts.Body2>
          </MessageContent>
        </MessageBox>
        <AppComponents.HorizonLine />
      </AppContainer.Basic>
    </WithHeader>
  );
};

export default NoticeScreen;
