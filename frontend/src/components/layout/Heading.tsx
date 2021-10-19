import React, { FC } from "react";
import styled from "styled-components";

//import token
import { neutral, spacing, primaryFont } from "../token";

export interface Props {
  kicker?: string;
  title?: string;
  subtitle?: string;
  helper?: string;
}

const Heading: FC<Props> = ({ kicker, title, helper, subtitle }) => {
  return (
    <Container>
      {kicker && <h6 className="kicker">{kicker}</h6>}
      {title && <h2 className="title">{title}</h2>}
      {helper && <p className="p3">{helper}</p>}
      {subtitle && <p className="p2">{subtitle}</p>}
    </Container>
  );
};

const Container = styled.div`
  /* text-align: center; */
  padding: ${spacing.m} 0;

  .kicker {
    margin-bottom: ${spacing.l};
  }

  .title {
    font-family: ${primaryFont};
    color: ${neutral[600]};
    margin: ${spacing.xxxs} 0;
  }

  .p3 {
    margin: ${spacing.l} 0;
  }

  .p2 {
    margin: ${spacing.l} 0;
  }
`;

export default Heading;
