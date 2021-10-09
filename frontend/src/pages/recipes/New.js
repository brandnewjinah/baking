import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

//import layout components
import Wrapper from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";

//import components
import { Input } from "../../components/Input";
import { FilledButton, OutlinedButton } from "../../components/Button";
import ResSelect from "../../components/ResSelect";

//import token
import { spacing, defaultTheme, neutral } from "../../components/token";

//local data
import { categoryOptions, authorOptions } from "../../data/recipeData";

//redux
import { connect } from "react-redux";
import { addRecipe, editRecipe } from "../../reducers/recipeReducer";

const New = (props) => {
  const history = useHistory();
  let location = useLocation();
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);

  //this recipe
  const [recipe, setRecipe] = useState({
    id: 0,
    name: "",
    description: "",
    category: {},
    author: {},
    youtube: "",
  });

  //add name, description, youtube
  const handleChange = ({ currentTarget: input }) => {
    const recipeClone = { ...recipe };
    recipeClone[input.name] = input.value;
    setRecipe(recipeClone);
  };

  //open category and author modal
  const handleModal = (name) => {
    name === "category"
      ? setShowCategory(!showCategory)
      : setShowAuthor(!showAuthor);
  };

  //add new category
  const [showCategory, setShowCategory] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const setSelected = (id, selected) => {
    const newRecipe = { ...recipe };
    newRecipe[id] = selected;
    setRecipe(newRecipe);
  };

  //validate errors
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (recipe.name === "") {
      errors.name = "Name is required";
    }
    if (recipe.category === "") {
      errors.category = "Category is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  //Next Button
  const handleNext = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    let newId =
      props.recipes && props.recipes.length > 0 ? props.recipes.length + 1 : 1;

    let newRecipe = { ...recipe, id: newId };
    props.addRecipe(newRecipe);
    history.push(`/recipes/${newId}/ingredients`);
  };

  //Edit Button
  const handleEdit = () => {
    props.editRecipe(recipe); //add to redux
    // alert("Updated");
    // history.push(`/recipe/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (location.pathname.includes("/edit")) {
      //get recipe info from redux store
      const currentItem = props.recipes.find((r) => r.id === recipeId);
      setRecipe(currentItem);
    }
  };

  return (
    <Wrapper>
      <Heading
        title={location.pathname.includes("/add") ? "Add a New Recipe" : "Edit"}
      />
      <p className="p3 center">* required</p>
      <Section>
        <Article>
          <Input
            label="Recipe Name"
            name="name"
            required
            value={recipe.name}
            error={errors.name}
            handleChange={handleChange}
          />
        </Article>
        <Article>
          <Input
            label="Short Description"
            name="description"
            value={recipe.description}
            handleChange={handleChange}
          />
        </Article>
        <Article>
          <p className="label">Category *</p>
          <OutlinedButton
            error={errors.category}
            label={
              recipe.category.value && recipe.category.value !== undefined
                ? recipe.category.value
                : "Select"
            }
            shape="rounded"
            fullwidth
            thin
            color={neutral[200]}
            textColor={neutral[600]}
            handleClick={() => handleModal("category")}
          />
          {errors.category && (
            <small className="errorTxt">{errors.category}</small>
          )}
          {showCategory && (
            <ResSelect
              setShowModal={setShowCategory}
              id="category"
              name="Category"
              data={categoryOptions}
              setSelected={(id, selected) => setSelected(id, selected)}
            />
          )}
        </Article>
        <Article>
          <p className="label">Author</p>
          <OutlinedButton
            label={
              recipe.author.value && recipe.author.value !== undefined
                ? recipe.author.value
                : "Select"
            }
            shape="rounded"
            fullwidth
            thin
            color={neutral[200]}
            textColor={neutral[600]}
            handleClick={() => handleModal("author")}
          />
          {showAuthor && (
            <ResSelect
              setShowModal={setShowAuthor}
              id="author"
              name="Author"
              data={authorOptions}
              setSelected={(name, selected) => setSelected(name, selected)}
            />
          )}
        </Article>
        <Article>
          <Input
            label="Youtube Link"
            name="youtube"
            value={recipe.youtube}
            handleChange={handleChange}
          />
        </Article>
        <FilledButton
          label={location.pathname.includes("/add") ? "Next" : "Edit"}
          fullwidth
          color={defaultTheme.secondaryColor}
          shape="rounded"
          spacing={spacing.xxs}
          handleClick={
            location.pathname.includes("/add") ? handleNext : handleEdit
          }
        />
      </Section>
    </Wrapper>
  );
};

const Section = styled.section``;

const Article = styled.article`
  width: 100%;
  margin: ${spacing.xl} 0;
`;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addRecipe, editRecipe })(New);
