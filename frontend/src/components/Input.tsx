import React, { ChangeEvent, FC, useState } from "react";

//import styles and assets
import styled, { css } from "styled-components";
import { Eye, EyeOff } from "../assets/Icons";
import { neutral, typeScale, spacing } from "./token";

export interface Props {
  label?: string;
  name: string;
  value?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "password" | "number";
  placeholder?: string;
  id?: any;
  small?: boolean;
  shape?: "underline" | "default";
  margin?: string;
  align?: string;
  autofocus?: boolean;
  disabled?: boolean;
  inputmode?: "url" | "tel" | "email" | "numeric" | undefined;
  maxLength?: number;
  suffix?: boolean;
  handleInput: (text: string) => void;
  handleChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

type StyleProps = {
  shape?: string | undefined;
  margin?: string | undefined;
  align?: string | undefined;
};

export const Input: FC<Props> = ({
  id,
  label,
  value,
  required,
  type,
  name,
  align,
  error,
  small,
  shape,
  margin,
  placeholder,
  disabled,
  inputmode,
  maxLength,
  suffix,
  handleChange,
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <Wrapper margin={margin} shape={shape}>
      {label && (
        <label htmlFor={name} aria-hidden="true">
          {label}
          {required && " *"}
        </label>
      )}

      <Container>
        {type === "password" && (
          <div className="pw" onClick={() => setIsPassword(!isPassword)}>
            {isPassword ? (
              <Eye width={20} height={20} color="#000" stroke={1} />
            ) : (
              <EyeOff width={20} height={20} color="#000" stroke={1} />
            )}
          </div>
        )}
        {suffix && <div className="suffix">{suffix}</div>}
        <InputTag
          placeholder={placeholder}
          shape={shape}
          align={align}
          id={id ? id : name}
          className={`${small && "small"} ${error && "error"}`}
          type={
            type === "password" && isPassword
              ? "password"
              : type === "number"
              ? "number"
              : "text"
          }
          inputMode={inputmode}
          name={name}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          aria-label={name}
          aria-required={required}
          aria-invalid={error ? true : false}
          onChange={handleChange}
        />
      </Container>
      {error && <small className="errorTxt">{error}</small>}
    </Wrapper>
  );
};

export const Floating: FC<Props> = ({
  label,
  value,
  required,
  type,
  name,
  error,
  margin,
  handleChange,
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <FloatingContainer margin={margin}>
      <input
        id={name}
        className={error ? "error" : ""}
        type={type === "password" && isPassword ? "password" : "text"}
        name={name}
        value={value}
        placeholder=" "
        aria-label={name}
        aria-required={required}
        aria-invalid={error ? true : false}
        onChange={handleChange}
      />
      <label htmlFor={name}>
        {label}
        {required && " *"}
      </label>
      {type === "password" && (
        <div className="pw" onClick={() => setIsPassword(!isPassword)}>
          {isPassword ? (
            <Eye width={20} height={20} color="#000" stroke={1} />
          ) : (
            <EyeOff width={20} height={20} color="#000" stroke={1} />
          )}
        </div>
      )}
      {error && <p className="errorTxt">error message</p>}
    </FloatingContainer>
  );
};

export const TextArea: FC<Props> = ({
  id,
  label,
  value,
  required,
  name,
  align,
  error,
  small,
  shape,
  margin,
  placeholder,
  disabled,
  maxLength,
  handleChange,
}) => {
  return (
    <Wrapper margin={margin} shape={shape}>
      {label && (
        <label htmlFor={name} aria-hidden="true">
          {label}
          {required && " *"}
        </label>
      )}

      <Container>
        <TextAreaTag
          placeholder={placeholder}
          shape={shape}
          align={align}
          id={id ? id : name}
          className={`${small && "small"} ${error && "error"}`}
          name={name}
          value={value}
          disabled={disabled}
          maxLength={maxLength}
          aria-label={name}
          aria-required={required}
          aria-invalid={error ? true : false}
          onChange={handleChange}
        />
      </Container>
      {error && <small className="errorTxt">{error}</small>}
    </Wrapper>
  );
};

const Global = css<StyleProps>`
  width: 100%;
  font-size: 1.05rem;
  border-radius: ${(props) =>
    props.shape === "underline" ? "none" : "0.35rem"};
  border-top: ${(props) =>
    props.shape === "underline" ? "none" : `1px solid #d2d2d7`};
  border-left: ${(props) =>
    props.shape === "underline" ? "none" : `1px solid #d2d2d7`};
  border-right: ${(props) =>
    props.shape === "underline" ? "none" : `1px solid #d2d2d7`};
  border-bottom: 1px solid #d2d2d7;
  padding: ${(props) =>
    props.align === "right" ? `0 0.75rem 0 0` : `0 0 0 0.75rem`};
`;

const Wrapper = styled.div<StyleProps>`
  margin: ${(props) => `${props.margin} 0`};

  label {
    display: inline-block;
    font-size: 0.925rem;
    color: ${neutral[400]};
    margin-bottom: ${spacing.xxxs};
  }

  .error {
    border-top: ${(props) =>
      props.shape === "underline" ? "none" : `1px solid red`};
    border-left: ${(props) =>
      props.shape === "underline" ? "none" : `1px solid red`};
    border-right: ${(props) =>
      props.shape === "underline" ? "none" : `1px solid red`};
    border-bottom: 1px solid red;

    background-color: ${(props) =>
      props.shape === "underline" ? "transparent" : "rgba(255, 0, 0, 0.05)"};
  }

  .small {
    height: 2.25rem;
  }

  .errorTxt {
    /* font-size: 0.7875rem; */
    color: red;
    margin: 0.25em 0;
  }
`;

const InputTag = styled.input<StyleProps>`
  ${Global}
  height: 3rem;
  /* padding: 0 0 0 0.75rem; */
  appearance: none;
  text-align: ${(props) => (props.align === "right" ? "right" : "left")};

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
    border-radius: 0.35rem;
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 0.925rem;
    color: ${neutral[200]};
  }
`;

const Container = styled.div`
  position: relative;

  .pw {
    position: absolute;
    top: 0.95rem;
    right: 0.75rem;
    display: flex;
    cursor: pointer;
  }

  .suffix {
    position: absolute;
    top: 0.95rem;
    right: 0.75rem;
    display: flex;
    cursor: pointer;
    font-size: ${typeScale.helper};
  }
`;

const FloatingContainer = styled.div<StyleProps>`
  position: relative;
  margin: ${(props) => `${props.margin} 0`};

  input {
    width: 100%;
    font-size: 1.05rem;
    height: 50px;
    border-radius: 0.35rem;
    border: 1px solid #d2d2d7;
    padding: 0.25rem 0.875rem 0;
    transition: all 0.3s ease-out;
    appearance: none;

    &:focus {
      box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
      outline: none;
    }
  }

  label {
    pointer-events: none;
    position: absolute;
    color: #888;
    top: 0;
    left: 0;
    margin: 1rem 0 0 0.875rem;
    transition: all 0.3s ease-out;
  }

  input:focus + label, 
  //placeholder-shown means input is empty, thus placeholder is shown. So apply the style when placeholder isn't shown, meaning when user typed something in the input field.
  input:not(:placeholder-shown) + label {
    font-size: 0.75rem;
    margin-top: 0.25em;
    left: 0.05rem;
    color: #3951b2;
  }

  .pw {
    position: absolute;
    top: 18px;
    right: 0;
    display: flex;
    cursor: pointer;
  }

  .error {
    border: 1px solid red;
    background-color: rgba(255, 0, 0, 0.05);
  }

  .helper {
    font-size: 0.7875rem;
    color: red;
    margin: 0.25em 0;
  }
`;

const TextAreaTag = styled.textarea<StyleProps>`
  ${Global}
`;
