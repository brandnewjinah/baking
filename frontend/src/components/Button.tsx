import React, { FC } from "react";
import styled from "styled-components";

//import token
import { defaultTheme, neutral } from "./token";

export interface Props {
  primaryColor?: string;
  secondaryColor?: string;
  disabled?: boolean;
  error?: boolean;
  fullwidth?: boolean;
  icon?: boolean;
  label?: string;
  shape?: "pill" | "rounded" | "sharp";
  size?: "small";
  spacing?: string;
  textColor?: string;
  thin?: boolean;
  handleClick?: () => void;
}

export const FilledButton: FC<Props> = ({
  children,
  primaryColor,
  secondaryColor,
  disabled,
  error,
  fullwidth,
  icon,
  label,
  size,
  shape,
  spacing,
  handleClick,
}) => {
  return (
    <FilledContainer
      aria-label={label}
      role="button"
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      size={size}
      shape={shape}
      disabled={disabled}
      fullwidth={fullwidth}
      spacing={spacing}
      onClick={handleClick}
    >
      <Flex>
        {icon && children}
        <p className="spacing">{label}</p>
      </Flex>
    </FilledContainer>
  );
};

export const TextButton: FC<Props> = ({
  label,
  primaryColor,
  disabled,
  handleClick,
}) => {
  return (
    <TextButtonContainer
      aria-label={label}
      primaryColor={primaryColor}
      disabled={disabled}
      onClick={handleClick}
    >
      <p>{label}</p>
    </TextButtonContainer>
  );
};

export const OutlinedButton: FC<Props> = ({
  children,
  primaryColor,
  disabled,
  error,
  fullwidth,
  icon,
  label,
  shape,
  textColor,
  thin,
  handleClick,
}) => {
  return (
    <OutlinedContainer
      aria-label={label}
      primaryColor={primaryColor}
      disabled={disabled && true}
      error={error}
      fullwidth={fullwidth}
      shape={shape}
      textColor={textColor}
      thin={thin}
      onClick={handleClick}
    >
      <Flex>
        {icon && children}
        <p>{label}</p>
      </Flex>
    </OutlinedContainer>
  );
};

export const IconButton: FC<Props> = ({
  children,
  primaryColor,
  secondaryColor,
  disabled,
  label,
  handleClick,
}) => {
  return (
    <IconContainer
      aria-label={label}
      title={label}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      disabled={disabled && true}
      onClick={handleClick}
    >
      {children}
    </IconContainer>
  );
};

const Button = styled.button<Props>`
  font-weight: 600;
  width: ${(props) => (props.fullwidth ? "100%" : null)};
  border-radius: ${(props) =>
    props.shape === "pill" ? "2em" : props.shape === "rounded" ? ".5em" : 0};

  padding: ${(props) =>
    props.size === "small" ? ".25em .5em" : "0.875em 1.5em"};
  transition: opacity 0.3s ease-out;
  cursor: pointer;

  &:disabled {
    opacity: 1;
    cursor: not-allowed;
  }
`;

const FilledContainer = styled(Button)<Props>`
  font-size: ${(props) => (props.size === "small" ? ".875rem" : "1rem")};
  background-color: ${(props) =>
    props.secondaryColor ? props.secondaryColor : props.primaryColor};
  border: none;
  color: ${(props) => (props.secondaryColor ? props.primaryColor : `#fff`)};
  cursor: pointer;

  .spacing {
    padding: ${(props) => `${props.spacing} 0`};
  }

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }

  &:disabled {
    background-color: ${defaultTheme.disalbed};
  }
`;

const OutlinedContainer = styled(Button)<Props>`
  background-color: ${(props) =>
    props.error ? `rgba(255, 0, 0, 0.05)` : `transparent`};
  font-weight: ${(props) => (props.thin ? 400 : 600)};
  border-style: solid;
  border-color: ${(props) => (props.error ? `red` : props.primaryColor)};
  /* border-color: ${(props) => props.primaryColor}; */
  border-width: ${(props) => (props.thin ? `1px` : `2px`)};
  color: ${(props) => (props.textColor ? props.textColor : props.primaryColor)};

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 1;
  }

  &:disabled {
    border-color: ${defaultTheme.disalbed};
    color: ${defaultTheme.disalbed};
  }
`;

const TextButtonContainer = styled.button<Props>`
  font-weight: 600;
  background: transparent;
  color: ${(props) => props.primaryColor};
  border: 0;
  border-bottom: ${(props) =>
    props.primaryColor ? `2px solid ${props.primaryColor}` : `2px solid black`};
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    border-bottom-color: transparent;
  }

  &:active {
    opacity: 1;
  }

  &:disabled {
    color: ${defaultTheme.disalbed};
    border-bottom-color: transparent;
    cursor: not-allowed;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 0.5em;
  }
`;

const IconContainer = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.primaryColor
      ? props.primaryColor
      : props.secondaryColor
      ? props.secondaryColor
      : neutral[100]};
  padding: 0.5em;
  border-radius: 100%;
  border: none;
  outline: transparent;
  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 0.65;
  }

  &:active {
    opacity: 0.85;
  }

  &:disabled {
    background-color: #b0b0b0;
    color: #b0b0b0;
    opacity: 1;
    cursor: not-allowed;
  }
`;
