import React from "react";
import styled from "styled-components";

const Header = () => {
  return <Nav>Baking Manager</Nav>;
};

const Nav = styled.nav`
  width: 100%;
  height: 60px;
  background-color: yellow;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  z-index: 100;
`;

export default Header;
