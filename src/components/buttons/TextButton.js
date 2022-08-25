import React from 'react';
import styled from 'styled-components';
import {FontStyle} from '../../utils/GlobalFonts';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  margin: ${props => props.margin}px;
`;

const Content = ({title, onPress, bold, margin}) => {
  return (
    <>
      <Button onPress={onPress} margin={margin ? margin : 0}>
        {bold ? (
          <FontStyle.ContentB>{title}</FontStyle.ContentB>
        ) : (
          <FontStyle.Content>{title}</FontStyle.Content>
        )}
      </Button>
    </>
  );
};

Content.PropTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  bold: PropTypes.bool,
  margin: PropTypes.number,
};

const SubContent = ({title, onPress, bold, margin}) => {
  return (
    <>
      <Button onPress={onPress} margin={margin ? margin : 0}>
        {bold ? (
          <FontStyle.ContentB>{title}</FontStyle.ContentB>
        ) : (
          <FontStyle.Content>{title}</FontStyle.Content>
        )}
      </Button>
    </>
  );
};

SubContent.PropTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  bold: PropTypes.bool,
  margin: PropTypes.number,
};

export const TextButton = {
  Content,
  SubContent,
};
