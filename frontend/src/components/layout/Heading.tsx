import React, { FC } from "react";
import styled from "styled-components";

//import token
import { neutral, spacing, primaryFont } from "../token";

export interface Props {
  kicker?: string;
  title?: string;
  subtitle?: string;
}

const Heading: FC<Props> = ({ kicker, title, subtitle }) => {
  return (
    <Container>
      {kicker && <h6>{kicker}</h6>}
      {title && <h2 className="title">{title}</h2>}
      {subtitle && <p className="p2">{subtitle}</p>}
    </Container>
  );
};

const Container = styled.div`
  /* text-align: center; */
  padding: ${spacing.m} 0;

  .title {
    font-family: ${primaryFont};
    font-weight: 800;
    color: ${neutral[600]};
    margin: ${spacing.xxxs} 0;
  }

  .p2 {
    margin: ${spacing.l} 0;
    color: ${neutral[500]};
    line-height: 1.5rem;
  }
`;

export default Heading;
