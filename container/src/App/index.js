import React from 'react';
import styled from 'styled-components';

import MicroFrontend from 'components/MicroFrontend';

const FRAGMENT_URL = 'http://localhost:3001';

const Container = styled.div`
  border: 1px solid black;
  width: 920px;
  margin: auto;
  height: 600px;
  padding: 50px;
  background-color: #ee6352;
  display: flex;
  flex-grow: 1;
  position: relative;
`;

const Sidebar = styled.div`
  border: 1px solid black;
  width: 200px;
  height: 500px;
  padding: 10px;
  flex: 1;
  background-color: #ee6352;
`;

const FragmentContainer = styled.div`
  border: 1px solid black;
  border-left: 0;
  width: 200px;
  height: 500px;
  padding: 10px;
  flex: 3;
  background-color: #3fa7d6;
`;

const Title = styled.h2`
  padding: 0;
  margin: 0;
  position: absolute;
  top: 15px;
  right: 15px;
`;

export function App() {
  return (
    <Container>
      <Title>Container</Title>
      <Sidebar>
        <h2>Sidebar</h2>
      </Sidebar>
      <FragmentContainer>
        <MicroFrontend host={FRAGMENT_URL} name="fragment" />
      </FragmentContainer>
    </Container>
  );
}

export default App;
