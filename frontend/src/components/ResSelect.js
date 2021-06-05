import React from "react";
import styled, { css } from "styled-components";

//import token
import { neutral, spacing, typeScale } from "./token";

import { Close } from "../assets/Icons";

const ResSelect = ({ setShowModal, data, setSelected, name, id }) => {
  const handleSelect = (selected) => {
    setSelected(id, selected);
    setShowModal((prev) => !prev);
  };

  return (
    <Background>
      <Header>
        <div className="left">{name}</div>
        <div className="right" onClick={() => setShowModal((prev) => !prev)}>
          <Close width={20} height={20} color="#000" stroke={2} />
        </div>
      </Header>
      <Container>
        <Section>
          {data.map((item, idx) => (
            <Item key={idx} onClick={() => handleSelect(item.name)}>
              <p>{item.name}</p>
            </Item>
          ))}
        </Section>
      </Container>
    </Background>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  overflow: scroll;
`;

const Header = styled.header`
  ${Flex}
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: #fff;
  font-weight: 500;
  border-bottom: 1px solid ${neutral[100]};
  padding: 0 ${spacing.xl};

  .left {
    flex: 0 0 50%;
  }

  .right {
    ${Flex}
    justify-content: flex-end;
    flex: 0 0 50%;
    cursor: pointer;
  }
`;

const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 60px 0 ${spacing.xl};
`;

const Section = styled.section``;

const Item = styled.div`
  font-size: ${typeScale.sbody};
  border-bottom: 1px solid ${neutral[100]};
  padding: ${spacing.m} ${spacing.xl};
  cursor: pointer;

  &:hover {
    background-color: ${neutral[100]};
  }
`;

export default ResSelect;
