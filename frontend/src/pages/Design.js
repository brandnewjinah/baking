import React from "react";
import styled from "styled-components";

//import token
import { spacing, neutral, defaultTheme } from "../components/token";

//import components
import { ToggleSwitch } from "../components/Toggle";

const Design = () => {
  return (
    <Wrapper>
      <Header>
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>
      </Header>
      <Section>
        <p>paragraph</p>
        <p className="label">label</p>
        <small>small</small>
      </Section>
      <Section>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.xxxs,
            margin: "1rem 0",
          }}
        >
          xxxs
        </div>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.xxs,
            margin: "1rem 0",
          }}
        >
          xxs
        </div>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.xs,
            margin: "1rem 0",
          }}
        >
          xs
        </div>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.s,
            margin: "1rem 0",
          }}
        >
          s
        </div>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.m,
            margin: "1rem 0",
          }}
        >
          m
        </div>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.l,
            margin: "1rem 0",
          }}
        >
          l
        </div>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.xl,
            margin: "1rem 0",
          }}
        >
          xl
        </div>
        <div
          style={{
            backgroundColor: "AntiqueWhite",
            padding: spacing.xxl,
            margin: "1rem 0",
          }}
        >
          xxl
        </div>
      </Section>
      <Section>
        <ToggleSwitch />
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;

  .label {
    font-size: 0.925rem;
    color: ${neutral[400]};
  }
`;

const Header = styled.header`
  padding: ${spacing.m} 0;
  font-family: ${defaultTheme.heading};
  color: ${neutral[600]};
`;

const Section = styled.section`
  margin: 1rem 0;
`;

export default Design;
