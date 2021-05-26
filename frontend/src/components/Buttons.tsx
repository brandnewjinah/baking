import React, { FC } from "react";
import { defaultTheme } from "./token";

//import libraries
import styled from "styled-components";

export interface Props {
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  shape?: "pill" | "rounded" | "sharp";
  color?: string;
  labelColor?: string;
  fullwidth?: boolean;
  icon?: boolean;
  disabled?: boolean;
  handleClick?: () => void;
}

export const Button: FC<Props> = ({
  label,
  variant,
  disabled,
  color,
  shape,
  labelColor,
  fullwidth,
  icon,
  children,
  handleClick,
}) => {
  return (
    <Container
      aria-label={label}
      variant={variant}
      color={color}
      shape={shape}
      disabled={disabled}
      labelColor={labelColor}
      fullwidth={fullwidth}
      onClick={handleClick}
    >
      <Flex>
        {icon && children}
        {label}
      </Flex>
    </Container>
  );
};

export const IconButton: FC<Props> = ({
  label,
  color,
  children,
  disabled,
  handleClick,
}) => {
  return (
    <IconContainer
      aria-label={label}
      title={label}
      color={color}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </IconContainer>
  );
};

const Container = styled.button<Props>`
  font-size: 0.9rem;
  letter-spacing: 0.015rem;
  font-weight: 600;
  border-radius: ${(props) =>
    props.variant === "tertiary"
      ? 0
      : props.shape === "sharp"
      ? 0
      : props.shape === "pill"
      ? "2rem"
      : props.shape === "rounded"
      ? "0.5rem"
      : 0};
  width: ${(props) => (props.fullwidth ? "100%" : null)};
  padding: ${(props) => (props.variant === "tertiary" ? 0 : "0.875em 1.5em")};
  background-color: ${(props) =>
    props.variant === "primary" ? props.color : "transparent"};
  border: ${(props) =>
    props.variant === "secondary" ? `2px solid ${props.color}` : "none"};
  border-bottom: ${(props) =>
    props.variant === "tertiary" && `2px solid ${props.color}`};
  color: ${(props) =>
    props.variant === "primary" ? props.labelColor : props.color};

  cursor: pointer;

  &:hover {
    opacity: 0.85;
    border-bottom-color: ${(props) =>
      props.variant === "tertiary" && "transparent"};
  }

  &:active {
    opacity: 1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(21, 156, 228, 0.4);
  }

  &:disabled {
    opacity: 1;
    background-color: ${(props) =>
      props.variant === "primary" ? defaultTheme.disalbed : "transparent"};
    border-color: ${(props) =>
      props.variant === "secondary" ? defaultTheme.disalbed : "none"};
    color: ${(props) =>
      props.variant === "primary" ? "none" : defaultTheme.disalbed};
    border-bottom-color: ${(props) =>
      props.variant === "tertiary" && "transparent"};
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
    background-color: ${defaultTheme.disalbed};
    opacity: 1;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 5px rgba(21, 156, 228, 0.4);
  }
`;
