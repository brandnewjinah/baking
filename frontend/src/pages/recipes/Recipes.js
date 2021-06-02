import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//import token
import { spacing, neutral } from "../../components/token";

//redux
import { connect } from "react-redux";
import { addDirections } from "../../reducers/recipeReducer";

const Recipes = (props) => {
  return (
    <Wrapper>
      {props.recipes.map((item, idx) => (
        <Link to={`/recipes/${item.id}`}>
          <div>{item.name}</div>
        </Link>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addDirections })(Recipes);
