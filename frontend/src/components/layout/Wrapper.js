import React from "react";
import styled from "styled-components";

//import token
import { neutral, spacing, typeScaleMobile } from "../token";

const Wrapper = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem 1.35rem;

  h6 {
    color: ${neutral[400]};
  }

  .p3 {
    letter-spacing: 0.03rem;
    color: ${neutral[400]};
  }

  .label {
    color: ${neutral[400]};
    margin-bottom: ${spacing.xxxs};
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

  .errorTxt {
    font-size: 0.7875rem;
    color: red;
    margin: 0.25em 0;
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

  .four {
    flex: 0 0 39.5%;
    padding: ${spacing.xxs} 0;
  }

  .fourhalf {
    flex: 0 0 44.5%;
    padding: ${spacing.xxs} 0;
  }

  .five {
    flex: 0 0 49.5%;
    padding: ${spacing.xxs} 0;
  }

  .fivehalf {
    flex: 0 0 54.5%;
    padding: ${spacing.xxs} 0;
  }

  .six {
    flex: 0 0 59.5%;
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

export default Wrapper;
