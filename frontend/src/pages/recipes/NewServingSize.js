import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

//import layout components
import { Wrapper } from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";
import {
  Section,
  Article,
  BtnContainer,
} from "../../components/layout/Containers";

//import components
import { Floating } from "../../components/Input";
import { FilledButton } from "../../components/Button";

//import token
import { defaultTheme } from "../../components/token";

//redux
import { connect } from "react-redux";
import { addRecipe, addServing } from "../../reducers/recipeReducer";

const NewIngredients = (props) => {
  const history = useHistory();

  //this recipe info
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);
  const thisRecipe = props.recipes.find((item) => item.id === recipeId);

  //handle serving
  const [serving, setServing] = useState("");

  const handleServingInput = ({ currentTarget: input }) => {
    setServing(input.value);
  };

  //Next buttom
  const handleNext = () => {
    props.addServing(serving, recipeId);
    history.push(`/recipes/${recipeId}/ingredients`);
  };

  return (
    <Wrapper>
      <Heading
        title="What is the serving size?"
        subtitle="How many people can this recipe serve? How many pieces can it make? How big is the cake going to be?"
      ></Heading>
      <Section>
        <Article>
          <div className="full ">
            <Floating
              label="e.g. 15cm Round Cake Pan"
              name="serving"
              type="text"
              value={serving.serving}
              handleChange={handleServingInput}
            />
          </div>
        </Article>
      </Section>

      <BtnContainer>
        <FilledButton
          label="Next"
          primaryColor={defaultTheme.secondaryColor}
          shape="pill"
          fullwidth
          handleClick={handleNext}
        />
      </BtnContainer>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addRecipe, addServing })(
  NewIngredients
);
