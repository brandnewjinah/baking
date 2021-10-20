import React, { FC, useState } from "react";

//import libraries
import styled from "styled-components";

export interface Props {
  small?: boolean;
}

export const ToggleSwitch: FC<Props> = ({ small, children }) => {
  const [toggled, setToggled] = useState(false);
  const onToggle = () => setToggled(!toggled);

  return (
    <Container small={small}>
      <label className="switch">
        <input type="checkbox" checked={toggled} onChange={onToggle} />
        <span className="thumb" />
      </label>
    </Container>
  );
};

const Container = styled.div<Props>`
  .switch {
    position: relative;
    display: inline-block;
    width: ${(props) => (props.small ? `25px` : `45px`)};
    height: ${(props) => (props.small ? `16px` : `25px`)};
  }
  .switch input[type="checkbox"] {
    display: none;
  }
  .switch .thumb {
    position: absolute;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 25px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: background-color 0.2s ease;
  }
  .switch .thumb::before {
    position: absolute;
    content: "";
    left: 2px;
    top: 2px;
    width: ${(props) => (props.small ? `12px` : `21px`)};
    height: ${(props) => (props.small ? `12px` : `21px`)};
    background-color: #aaa;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  .switch input[type="checkbox"]:checked + .thumb::before {
    /* transform: translateX(20px); */
    transform: ${(props) =>
      props.small ? `translateX(8px)` : `translateX(20px)`};
    background-color: #6699cc;
  }
  .switch input[type="checkbox"]:checked + .thumb {
    background-color: #336699;
  }
`;
