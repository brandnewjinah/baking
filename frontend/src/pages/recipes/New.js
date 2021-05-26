import React, { useState } from "react";
import styled, { css } from "styled-components";
import Select from "react-select";

//import componts
import { Input } from "../../components/Input";

//local data
import { categoryOptions, authorOptions } from "../../data/recipeData";
import { Button } from "../../components/Buttons";

const New = () => {
  const [recipe, setRecipe] = useState({
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

  console.log(recipe);

  return (
    <Wrapper>
      <Header>
        <h2>New Recipe</h2>
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
        <Button label="Next" variant="primary" />
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

export default New;
