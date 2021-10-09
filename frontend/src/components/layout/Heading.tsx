import React, { FC } from "react";
import styled from "styled-components";

//import token
import { neutral, spacing, defaultTheme } from "../token";

export interface Props {
  kicker?: string;
  title?: string;
}

const Heading: FC<Props> = ({ kicker, title }) => {
  return (
    <Container>
      {kicker && <h6>{kicker}</h6>}
      {title && <h2 className="title">{title}</h2>}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  padding: ${spacing.m} 0;

  .title {
    font-family: ${defaultTheme.heading};
    color: ${neutral[600]};
    margin: ${spacing.xxxs} 0;
  }
`;

export default Heading;
