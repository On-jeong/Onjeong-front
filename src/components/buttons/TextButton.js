import React from 'react';
import styled from 'styled-components';
import {FontStyle} from '../../utils/GlobalFonts';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  margin: ${props => props.margin}px;
`;

export const TextButton = ({title, onPress, bold, margin}) => {
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

TextButton.PropTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
