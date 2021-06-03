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
      <Section>
        <Link to={`/recipes/add`}>Add Recipe</Link>
      </Section>
      <Section>
        {props.recipes.map((item, idx) => (
          <Link to={`/recipes/${item.id}`}>
            <div>{item.name}</div>
          </Link>
        ))}
      </Section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Section = styled.section``;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addDirections })(Recipes);
