import styled from 'styled-components';

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowCenter = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RowSpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AppStyled = {
  Container,
  Row,
  RowCenter,
  RowSpaceBetween,
};
