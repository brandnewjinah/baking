import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

//import token
import {
  breakpoint,
  spacing,
  neutral,
  tertiaryFont,
  primaryColor,
  typeScale,
} from "./token";

//import local data
import { menuData } from "../data/menuData";

const Header = (props) => {
  return (
    <Nav>
      <Left to="/">
        <Logo>Bake</Logo>
      </Left>
      <MenuBtn isOpen={props.isOpen} onClick={props.toggle}>
        <div />
        <div />
      </MenuBtn>
      <Right>
        {menuData.map((item, index) => (
          <li key={index}>
            <MenuLink to={item.link}>{item.title}</MenuLink>
          </li>
        ))}
      </Right>
    </Nav>
  );
};

const Flex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  ${Flex}
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: ${neutral[10]};
  padding: ${spacing.xl};
  z-index: 10;
`;

const Left = styled(Link)`
  text-decoration: none;
  line-height: 0;
  flex: 0 0 50%;
`;

const Logo = styled.div`
  font-family: ${tertiaryFont};
  font-size: 1.5rem;
  font-weight: 800;
  color: ${primaryColor.red};
`;

const MenuBtn = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
  background-color: transparent;
  outline: transparent;
  border: transparent;
  height: 40px;
  width: 40px;
  cursor: pointer;

  div {
    display: flex;
    align-content: center;
    justify-content: center;
    transition: all 0.4s ease;
    position: absolute;
    z-index: 1;
    width: 20px;
    height: 1px;
    background-color: #000;

    &:first-child {
      opacity: 1;
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(45deg)" : "rotate(0) translateY(-4px)"};
    }

    &:last-child {
      opacity: 1;
      transform: ${({ isOpen }) =>
        isOpen ? "rotate(-45deg)" : "rotate(0) translateY(4px)"};
    }
  }

  @media (min-width: 640px) {
    display: none;
  }
`;

const Right = styled.ul`
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
  flex: 0 0 50%;

  @media ${breakpoint.m} {
    display: none;
  }
`;

const MenuLink = styled(Link)`
  font-size: ${typeScale.sbody};
  letter-spacing: 0.0875rem;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  margin-left: 1.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

export default Header;
