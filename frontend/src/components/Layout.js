import React from "react";
import styled from "styled-components";

//import components
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Container>{children}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.main`
  padding-top: 60px;
`;

export default Layout;
