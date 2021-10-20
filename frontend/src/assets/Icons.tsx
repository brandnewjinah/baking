import React, { FC } from "react";

interface Props {
  width: number;
  height: number;
  stroke?: number;
  color?: string;
  fill?: string;
  ariaHidden?: boolean;
}

export const ArrowLeft: FC<Props> = ({
  width,
  height,
  stroke,
  color,
  fill,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
};

export const Cart: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={9} cy={21} r={1} />
      <circle cx={20} cy={21} r={1} />
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
    </svg>
  );
};

export const ChevronDown: FC<Props> = ({
  width,
  height,
  stroke,
  color,
  fill,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
};

export const ChevronLeft: FC<Props> = ({
  width,
  height,
  stroke,
  color,
  fill,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
};

export const ChevronRight: FC<Props> = ({
  width,
  height,
  stroke,
  color,
  fill,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export const Close: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

export const Eye: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx={12} cy={12} r={3} />
    </svg>
  );
};

export const EyeOff: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
    </svg>
  );
};

export const Heart: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
};

export const Facebook: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
    >
      <path d="M17.525 9H14V7c0-1.032.084-1.682 1.563-1.682h1.868v-3.18A26.065 26.065 0 0014.693 2C11.98 2 10 3.657 10 6.699V9H7v4l3-.001V22h4v-9.003l3.066-.001L17.525 9z" />
    </svg>
  );
};

export const Google: FC<Props> = ({
  width,
  height,
  stroke,
  color,
  fill,
  ariaHidden,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      aria-hidden={ariaHidden}
    >
      <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
    </svg>
  );
};

export const Minus: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
};

export const More: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={1} />
      <circle cx={12} cy={5} r={1} />
      <circle cx={12} cy={19} r={1} />
    </svg>
  );
};

export const Pencil: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
};

export const Plus: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
};

export const Store: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
};

export const Trash: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
    </svg>
  );
};

export const Whisk: FC<Props> = ({ width, height, stroke, color, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill ? fill : "none"}
      stroke={color}
      strokeWidth={stroke}
      viewBox="0 0 110 255"
    >
      <path d="M54.94.64h-.36-.01c-32.41.01-65.39 33.38-51 71.8 10.76 28.71 23.46 59.01 33.57 82.36h-.12v83.19c0 9.29 7.42 16.82 16.58 16.82h2.32c9.15 0 16.58-7.53 16.58-16.82V154.8h-.12c10.12-23.35 22.82-53.66 33.57-82.36C120.36 34.01 87.36.64 54.94.64zm-.37 8.03c1.11.2 2.88 1.23 4.91 3.66 6.81 8.16 13.28 28.1 9.1 57.44-3.78 26.54-8.26 55.49-11.66 77.05h-4.7c-3.4-21.55-7.87-50.5-11.66-77.05-4.18-29.34 2.29-49.28 9.1-57.44 2.03-2.43 3.81-3.47 4.91-3.66zM11.06 69.63c-5.18-13.82-3.48-28 4.79-39.93C21.93 20.93 31 14.28 40.82 10.97c-7.38 11.78-12.02 32.94-8.17 59.91 3.5 24.59 7.68 51.82 11.48 75.92h-1.72c-12.24-28.41-23.04-55-31.35-77.17zM64.5 162.8v75.19c0 4.86-3.85 8.82-8.58 8.82H53.6c-4.73 0-8.58-3.96-8.58-8.82V154.8h19.47v8zm33.97-93.17c-8.31 22.17-19.11 48.76-31.34 77.17h-2.11c3.8-24.09 7.97-51.33 11.48-75.92 3.86-27.09-.83-48.31-8.26-60.06 10.01 3.25 19.27 9.96 25.45 18.88 8.26 11.93 9.96 26.11 4.78 39.93z" />
    </svg>
  );
};

//width={20} height={20}color="#000" stroke={2}
