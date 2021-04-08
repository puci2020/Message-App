import React from "react";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  height: 100vh;
  /* display: grid;
  place-items: center; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.primary};
  height: 90vh;
  width: 90vw;
  box-shadow: -1px 4px 20px -6px rgba(0, 0, 0, 0.7);
`;

const App = () => (
  <Wrapper>
    <Container>
        <Sidebar/>
    </Container>
  </Wrapper>
);

export default App;
