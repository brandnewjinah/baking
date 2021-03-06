import React, { FC } from "react";
import styled from "styled-components";

//import token
import { neutral, spacing, primaryColor } from "../token";

export interface Props {
  padding?: string;
  className?: string;
}

type StyleProps = {
  padding?: string | undefined;
};

export const Section: FC<Props> = ({ children, padding }) => {
  return <SectionContainer padding={padding}>{children}</SectionContainer>;
};

export const Article: FC<Props> = ({ children, padding }) => {
  return <ArticleContainer padding={padding}>{children}</ArticleContainer>;
};

export const Div: FC<Props> = ({ children, padding, className }) => {
  return (
    <DivContainer padding={padding} className={className}>
      {children}
    </DivContainer>
  );
};

export const Header: FC<Props> = ({ children, padding, className }) => {
  return (
    <HeaderContainer padding={padding} className={className}>
      {children}
    </HeaderContainer>
  );
};

export const Select: FC<Props> = ({ children }) => {
  return <SelectContainer>{children}</SelectContainer>;
};

export const BtnContainer: FC<Props> = ({ children }) => {
  return <ButtonContainer>{children}</ButtonContainer>;
};

export const Divider: FC<Props> = ({ children }) => {
  return <DividerContainer>{children}</DividerContainer>;
};

const SectionContainer = styled.section<StyleProps>`
  width: 100%;
  padding: ${(props) => props.padding};

  .background {
    /* background-color: ${neutral[100]}; */
    padding: ${spacing.xxs};
  }
`;

const ArticleContainer = styled.article<StyleProps>`
  width: 100%;
  padding: ${(props) => props.padding};
`;

const DivContainer = styled.div<StyleProps>`
  width: 100%;
  padding: ${(props) => props.padding};
`;

const HeaderContainer = styled.header<StyleProps>`
  width: 100%;
  padding: ${(props) => props.padding};
`;

const SelectContainer = styled.div`
  width: 100%;
  padding: ${spacing.s} 0 0;

  .label {
    color: #3951b2;
  }

  .selectBtn {
    width: 100%;
    text-align: left;
    border-bottom: 1px solid ${neutral[200]};
    padding: ${spacing.xxxs} 0 ${spacing.xs};
    cursor: pointer;
  }

  .error {
    border-bottom: 1px solid ${primaryColor.red};
  }

  .errorTxt {
    color: ${primaryColor.red};
    padding-bottom: ${spacing.xxs};
  }

  .defaultLabel {
    color: ${neutral[400]};
    padding-bottom: ${spacing.xxs};
  }
`;

const ButtonContainer = styled.div`
  padding: ${spacing.xxl} 0;
`;

const DividerContainer = styled.div`
  border-bottom: 1px solid ${neutral[100]};
`;
