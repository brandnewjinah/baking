import React from "react";
import styled from "styled-components";

//import componts
import { ArrowLeft } from "../../assets/Icons";

//local data

const NewIngredients = (props) => {
  return (
    <Section>
      <Header>
        <button onClick={props.handleClick}>
          <ArrowLeft width={20} height={20} color="#000" stroke={2} />
        </button>
        <div className="textInput">
          <input autoFocus onChange={props.handleChange} name={props.name} />
        </div>
      </Header>
    </Section>
  );
};

const Section = styled.section`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 1000;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
  padding: 0.5em 0;

  button {
    flex: 0 0 10%;
  }

  input {
    width: 100%;
    /* border: none; */

    &:focus {
      outline: none;
    }
  }

  .textInput {
    flex: 0 0 88%;
  }
`;

export default NewIngredients;
