import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { neutral, typeScale } from "./token";

//import local data
import { homeMenu } from "../data/menuData";

const SideMenu = ({ isOpen, toggle }) => {
  return (
    <Wrapper isOpen={isOpen} onClick={toggle}>
      <MenuContainer>
        <Menu>
          {homeMenu.map((item, index) => (
            <li key={index}>
              <MenuLink to={item.link}>{item.title}</MenuLink>
            </li>
          ))}
        </Menu>
        {/* <UtilMenu>
          <div className="item">
            <MenuLink to="/">Signup</MenuLink>
          </div>
          <div className="item">
            <MenuLink to="/">hello</MenuLink>
          </div>
        </UtilMenu> */}
      </MenuContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #fff;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  /* opacity: ${({ isOpen }) => (isOpen ? "1" : "0")}; */
  transition: all 0.3s ease-out;
  padding: 60px 2rem;
  z-index: 9;

  @media (min-width: 640px) {
    display: none;
  }
`;

const MenuContainer = styled.div``;

const Menu = styled.ul`
  li {
    text-align: center;
    padding: 1.25rem 0;
    border-bottom: 1px solid ${neutral[100]};
  }
`;

const MenuLink = styled(Link)`
  color: #000;
  font-size: ${typeScale.body};
  text-transform: uppercase;
  text-decoration: none;

  cursor: pointer;
  transition: 0.2s ease-in-out;
`;

const UtilMenu = styled.div`
  .item {
    text-align: center;
    padding: 1.25rem 0;
    border-bottom: 1px solid ${neutral[100]};
  }
`;

export default SideMenu;
