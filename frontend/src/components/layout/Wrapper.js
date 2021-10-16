import React from "react";
import styled, { css } from "styled-components";

//import token
import { neutral, spacing, typeScaleMobile } from "../token";

export const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

export const WrapperFull = ({ children }) => {
  return <ContainerFull>{children}</ContainerFull>;
};

const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Global = css`
  width: 100%;
  height: 100%;

  .flex {
    ${Flex}
    justify-content: space-between;
  }

  .flexCenter {
    ${Flex}
  }

  .one {
    flex: 0 0 9.5%;
  }

  .four {
    flex: 0 0 39.5%;
  }

  .fourhalf {
    flex: 0 0 44.5%;
  }

  .five {
    flex: 0 0 49.5%;
  }

  .fivehalf {
    flex: 0 0 54.5%;
  }

  .six {
    flex: 0 0 59.5%;
  }
`;

const Container = styled.div`
  ${Global}
  padding: 2rem 1.35rem;

  h6 {
    color: ${neutral[400]};
  }

  .p3 {
    letter-spacing: 0.03rem;
    color: ${neutral[400]};
  }

  .center {
    text-align: center;
  }

  .upper {
    text-transform: uppercase;
  }

  .vspace {
    padding: ${spacing.xxs} 0;
  }

  .half {
    flex: 0 0 4.5%;
    padding: ${spacing.xxs} 0;
  }

  .two {
    flex: 0 0 19.5%;
    padding: ${spacing.xxs} 0;
  }

  .three {
    flex: 0 0 29.5%;
    padding: ${spacing.xxs} 0;
  }

  .seven {
    flex: 0 0 69.5%;
    padding: ${spacing.xxs} 0;
  }

  .sevenhalf {
    flex: 0 0 74.5%;
    padding: ${spacing.xxs} 0;
  }
`;

const ContainerFull = styled.div`
  ${Global}
`;
