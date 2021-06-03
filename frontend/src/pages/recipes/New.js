import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import Select from "react-select";

//import componts
import { Input } from "../../components/Input";
import { Button } from "../../components/Buttons";

//import token
import { spacing, neutral, tertiaryFont } from "../../components/token";

//local data
import { categoryOptions, authorOptions } from "../../data/recipeData";

//redux
import { connect } from "react-redux";
import { addRecipe } from "../../reducers/recipeReducer";

const New = (props) => {
  const history = useHistory();
  const [recipe, setRecipe] = useState({
    id: 0,
    name: "",
    category: "",
    author: "",
    url: "",
    photo: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...recipe };
    userInput[input.name] = input.value;
    setRecipe(userInput);
  };

  const handleCategorySelect = (item, name) => {
    const userInput = { ...recipe };
    userInput[name.name] = item.value;
    setRecipe(userInput);
  };

  const handleNext = () => {
    let newId =
      props.recipes && props.recipes.length > 0 ? props.recipes.length + 1 : 1;

    let newRecipe = { ...recipe, id: newId };
    props.addRecipe(newRecipe);
    history.push(`/recipes/${newId}/ingredients`);
  };

  return (
    <Wrapper>
      <Header>
        <h4 className="title">New Recipe</h4>
      </Header>
      <Item>
        <Input
          label="Name"
          name="name"
          value={recipe.name}
          handleChange={handleChange}
        />
      </Item>
      <Item>
        <p>Category</p>
        <Select
          name="category"
          placeholder="Select"
          options={
            categoryOptions &&
            categoryOptions.map((item) => ({
              label: item.name,
              value: item.name,
              id: item.id,
            }))
          }
          onChange={(event, name) => handleCategorySelect(event, name)}
        />
      </Item>
      <Item>
        <p>Author</p>
        <Select
          name="author"
          placeholder="Select"
          options={
            authorOptions &&
            authorOptions.map((item) => ({
              label: item.name,
              value: item.name,
              id: item.id,
            }))
          }
          onChange={(event, name) => handleCategorySelect(event, name)}
        />
      </Item>
      <Item>
        <Input
          label="URL"
          name="url"
          value={recipe.url}
          handleChange={handleChange}
        />
      </Item>
      <Item>
        <Input
          label="Photo URL"
          name="photo"
          value={recipe.photo}
          handleChange={handleChange}
        />
      </Item>
      <Buttons>
        <Button label="Next" variant="primary" handleClick={handleNext} />
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;

  .title {
    font-family: ${tertiaryFont};
    color: ${neutral[600]};
    margin: ${spacing.xxxs} 0;
  }
`;

const Item = styled.div`
  width: 100%;
  margin: 1.5rem 0;
`;

const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Buttons = styled.div`
  ${Flex}
  margin: 4rem 0;
`;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addRecipe })(New);
