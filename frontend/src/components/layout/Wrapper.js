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

  .flexEnd {
    ${Flex}
    justify-content: flex-end;
  }

  .flexAlignTop {
    ${Flex}
    align-items: flex-start;
  }

  .center {
    text-align: center;
  }

  .upper {
    text-transform: uppercase;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .bold {
    font-weight: 700;
  }

  .half {
    flex: 0 0 4.5%;
  }

  .one {
    flex: 0 0 9.5%;
  }

  .two {
    flex: 0 0 19.5%;
  }

  .three {
    flex: 0 0 29.5%;
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

  .seven {
    flex: 0 0 69.5%;
  }

  .sevenhalf {
    flex: 0 0 74.5%;
  }

  .nine {
    flex: 0 0 89.5%;
  }

  .vspacexxs {
    padding-bottom: ${spacing.xxs};
  }

  .vspacexs {
    padding-bottom: ${spacing.xs};
  }

  .vspaces {
    padding: ${spacing.xs} 0;
  }

  .p2 {
    color: ${neutral[500]};
    line-height: 1.5rem;
  }

  .p3 {
    letter-spacing: 0.03rem;
    color: ${neutral[700]};
  }
`;

const Container = styled.div`
  ${Global}
  padding: 2rem 1.35rem;
`;

const ContainerFull = styled.div`
  ${Global}
`;
