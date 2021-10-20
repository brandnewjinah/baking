import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

//import layout components
import { Wrapper } from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";
import {
  Section,
  Article,
  Select,
  Div,
  BtnContainer,
} from "../../components/layout/Containers";

//import components
import { Floating } from "../../components/Input";
import { FilledButton, TextButton } from "../../components/Button";
import ResSelect from "../../components/ResSelect";

//import token
import { spacing, defaultTheme, primaryColor } from "../../components/token";

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
  const editMode = location.pathname.includes("/edit");

  useEffect(() => {
    const getData = () => {
      if (editMode) {
        //get recipe info from redux store
        const currentItem = props.recipes.find((r) => r.id === recipeId);
        setRecipe(currentItem);
      }
    };
    getData();
  }, [editMode, props.recipes, recipeId]);

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
  const setSelected = (group, id, selected) => {
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
    if (Object.keys(recipe.category).length === 0) {
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
    history.push(`/recipes/${newId}/serving`);
  };

  //Edit Button
  const handleEdit = () => {
    props.editRecipe(recipe); //add to redux
    alert("Updated");
    history.push(`/recipe/${recipeId}`);
  };

  const cancelEdit = () => {
    history.push(`/recipe/${recipeId}`);
  };

  return (
    <Wrapper>
      <Heading title={editMode ? "Edit" : "Add a new recipe"} />
      <Section>
        <Article padding={`${spacing.xl} 0`}>
          <Floating
            label="Recipe Name"
            name="name"
            required
            value={recipe.name}
            error={errors.name}
            handleChange={handleChange}
          />
        </Article>
        <Article padding={`${spacing.xl} 0`}>
          <Floating
            label="Short Description"
            name="description"
            value={recipe.description}
            handleChange={handleChange}
          />
        </Article>

        <Article padding={`${spacing.xl} 0`}>
          <Select>
            <p className="label">
              {recipe.category.value && recipe.category.value !== undefined
                ? "Category"
                : ""}
            </p>
            <div
              className={errors.category ? "selectBtn error" : "selectBtn"}
              onClick={() => handleModal("category")}
            >
              {recipe.category.value && recipe.category.value !== undefined ? (
                <p>{recipe.category.value}</p>
              ) : (
                <>
                  {errors.category ? (
                    <p className="errorTxt">Category Required</p>
                  ) : (
                    <p className="defaultLabel">Select Category *</p>
                  )}
                </>
              )}
            </div>
          </Select>
          {showCategory && (
            <ResSelect
              setShowModal={setShowCategory}
              id="category"
              name="Category"
              data={categoryOptions}
              setSelected={(group, id, selected) =>
                setSelected(group, id, selected)
              }
            />
          )}
        </Article>
        <Article padding={`${spacing.xl} 0`}>
          <Select>
            <p className="label">
              {recipe.author.value && recipe.author.value !== undefined
                ? "Author"
                : ""}
            </p>
            <div className="selectBtn" onClick={() => handleModal("author")}>
              {recipe.author.value && recipe.author.value !== undefined ? (
                <p>{recipe.author.value}</p>
              ) : (
                <p className="defaultLabel">Select Author</p>
              )}
            </div>
          </Select>
          {showAuthor && (
            <ResSelect
              setShowModal={setShowAuthor}
              id="author"
              name="Author"
              data={authorOptions}
              setSelected={(group, name, selected) =>
                setSelected(group, name, selected)
              }
            />
          )}
        </Article>
        <Article padding={`${spacing.xl} 0`}>
          <Floating
            label="Youtube Link"
            name="youtube"
            value={recipe.youtube}
            handleChange={handleChange}
          />
        </Article>
        <BtnContainer>
          <FilledButton
            label={editMode ? "Save" : "Next"}
            fullwidth
            primaryColor={defaultTheme.secondaryColor}
            shape="pill"
            spacing={spacing.xxxxs}
            handleClick={editMode ? handleEdit : handleNext}
          />
          {editMode && (
            <Div className="flexCenter" padding={`${spacing.xl} 0`}>
              <TextButton
                label="Cancel"
                primaryColor={primaryColor.yellow}
                handleClick={cancelEdit}
              />
            </Div>
          )}
        </BtnContainer>
      </Section>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addRecipe, editRecipe })(New);
