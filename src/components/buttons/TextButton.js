import React from 'react';
import styled from 'styled-components';
import {FontStyle} from '../../utils/GlobalFonts';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  margin: 5px;
`;

export const TextButton = ({title, onPress}) => {
  return (
    <>
      <Button onPress={onPress} >
        <FontStyle.ContentB>{title}</FontStyle.ContentB>
      </Button>
    </>
  );
};

TextButton.PropTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};
