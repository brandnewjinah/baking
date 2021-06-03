import React, { useState } from "react";
import styled from "styled-components";

//import components
import Header from "./Header";
import SideMenu from "./SideMenu";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Header isOpen={isOpen} toggle={toggle} />
      <SideMenu isOpen={isOpen} toggle={toggle} />
      <Container>{children}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Container = styled.main`
  padding-top: 60px;
`;

export default Layout;
