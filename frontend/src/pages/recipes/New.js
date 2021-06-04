import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import Select from "react-select";

//import componts
import { Input } from "../../components/Input";
import { Button } from "../../components/Buttons";
import ResSelect from "../../components/ResSelect";

//import token
import { spacing, neutral, tertiaryFont } from "../../components/token";

//local data
import { categoryOptions, authorOptions } from "../../data/recipeData";

//redux
import { connect } from "react-redux";
import { addRecipe } from "../../reducers/recipeReducer";

const New = (props) => {
  const history = useHistory();

  //this recipe
  const [recipe, setRecipe] = useState({
    id: 0,
    name: "",
    category: "",
    author: "",
    url: "",
    photo: "",
  });

  //Add name, url
  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...recipe };
    userInput[input.name] = input.value;
    setRecipe(userInput);
  };

  //Add category and author
  const handleCategorySelect = (item, name) => {
    const userInput = { ...recipe };
    userInput[name.name] = item.value;
    setRecipe(userInput);
  };

  //add new category
  const [showModal, setShowModal] = useState(false);
  const setSelected = (id, selected) => {
    const newRecipe = { ...recipe };
    newRecipe[id] = selected;
    setRecipe(newRecipe);
  };

  const handleModal = () => {
    // document.body.style.overflow !== "hidden"
    //   ? (document.body.style.overflow = "hidden")
    //   : (document.body.style.overflow = "scroll");

    setShowModal(!showModal);
  };

  //Next button
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
        <p className="label">Category</p>
        <button onClick={handleModal}>
          {recipe.category && recipe.category !== undefined
            ? recipe.category
            : "Select"}
        </button>
        <ResSelect
          showModal={showModal}
          setShowModal={setShowModal}
          id="category"
          name="Category"
          data={categoryOptions}
          setSelected={(id, selected) => setSelected(id, selected)}
        />
      </Item>
      <Item>
        <p className="label">Author</p>
        <button onClick={handleModal}>
          {recipe.category && recipe.category !== undefined
            ? recipe.author
            : "Select"}
        </button>
        <ResSelect
          showModal={showModal}
          setShowModal={setShowModal}
          id="author"
          name="Author"
          data={authorOptions}
          setSelected={(e, id) => setSelected(e, id)}
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
  overflow: auto;
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

  .label {
    font-size: 0.925rem;
    color: #94928f;
  }

  button {
    background-color: transparent;
    border: 1px solid #d2d2d7;
    border-radius: ${spacing.xxxs};
    padding: ${spacing.s};
    font-size: 0.9rem;
    width: 100%;
    cursor: pointer;
  }
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
