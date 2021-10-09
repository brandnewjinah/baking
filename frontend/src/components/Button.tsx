import React, { FC } from "react";
import { defaultTheme } from "./token";

//import libraries
import styled from "styled-components";

export interface Props {
  color?: string;
  disabled?: boolean;
  error?: boolean;
  fullwidth?: boolean;
  icon?: boolean;
  label?: string;
  shape?: "pill" | "rounded" | "sharp";
  spacing?: string;
  textColor?: string;
  thin?: boolean;

  handleClick?: () => void;
}

export const FilledButton: FC<Props> = ({
  color,
  disabled,
  error,
  fullwidth,
  icon,
  label,
  shape,
  spacing,
  handleClick,
  children,
}) => {
  return (
    <FilledContainer
      aria-label={label}
      role="button"
      color={color}
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
  color,
  disabled,
  handleClick,
}) => {
  return (
    <TextButtonContainer
      aria-label={label}
      color={color}
      disabled={disabled}
      onClick={handleClick}
    >
      <p>{label}</p>
    </TextButtonContainer>
  );
};

export const OutlinedButton: FC<Props> = ({
  children,
  color,
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
      color={color}
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
  color,
  disabled,
  label,
  handleClick,
}) => {
  return (
    <IconContainer
      aria-label={label}
      title={label}
      color={color}
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
  padding: 0.875em 1.5em;
  transition: opacity 0.3s ease-out;
  cursor: pointer;

  &:disabled {
    opacity: 1;
    cursor: not-allowed;
  }
`;

const FilledContainer = styled(Button)<Props>`
  background-color: ${(props) => props.color};
  border: none;
  color: #fff;
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
  font-weight: ${(props) => (props.thin ? 400 : 500)};
  border-style: solid;
  border-color: ${(props) => (props.error ? `red` : props.color)};
  /* border-color: ${(props) => props.color}; */
  border-width: ${(props) => (props.thin ? `1px` : `2px`)};
  color: ${(props) => (props.textColor ? props.textColor : props.color)};

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
  color: ${(props) => props.color};
  border: 0;
  border-bottom: ${(props) =>
    props.color ? `2px solid ${props.color}` : `2px solid black`};
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
  background-color: ${(props) => props.color};
  padding: 0.75em;
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
