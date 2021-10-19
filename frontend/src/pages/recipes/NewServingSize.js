import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";

//import layout components
import { Wrapper } from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";
import {
  Section,
  Article,
  Div,
  BtnContainer,
} from "../../components/layout/Containers";

//import components
import { Floating, Input } from "../../components/Input";
import { FilledButton, TextButton } from "../../components/Button";

//import token
import { defaultTheme, spacing, primaryColor } from "../../components/token";

//redux
import { connect } from "react-redux";
import {
  addRecipe,
  addDetails,
  editRecipe,
} from "../../reducers/recipeReducer";

const NewIngredients = (props) => {
  const history = useHistory();
  let location = useLocation();

  //this recipe info
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);
  const editMode = location.pathname.includes("/edit");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (editMode) {
      //get recipe info from redux store
      const currentItem = props.recipes.find((r) => r.id === recipeId);
      setDetails(currentItem.details);
    }
  };

  //details
  const [details, setDetails] = useState([
    { name: "oven", value: "", unit: "°C" },
    { name: "bake", value: "", unit: "min" },
    { name: "yield", value: "" },
  ]);

  const handleInput = ({ currentTarget: input }, name) => {
    let newDetails = [...details];

    //find current item
    let itemIndex = newDetails.findIndex((item) => item.name === name);
    let thisItem = newDetails[itemIndex];

    //set amount value
    thisItem = { ...thisItem, value: input.value };
    newDetails[itemIndex] = thisItem;
    setDetails(newDetails);
  };

  //Next buttom
  const handleNext = () => {
    if (editMode) {
      props.editRecipe("details", details, recipeId);
      alert("Updated");
      history.push(`/recipe/${recipeId}`);
    } else {
      props.addDetails(details, recipeId);
      history.push(`/recipes/${recipeId}/ingredients`);
    }
  };

  const cancelEdit = () => {
    history.push(`/recipe/${recipeId}`);
  };

  return (
    <Wrapper>
      <Heading
        title="Add some details?"
        subtitle="How many people can this recipe serve? How many pieces can it make? How big is the cake going to be?"
      ></Heading>
      <Section padding={`${spacing.xl} 0`}>
        <h5 className="vspacexs">Serving Size</h5>
        <Article>
          <div className="full ">
            <Floating
              label="e.g. 15cm Round Cake Pan"
              name="yield"
              type="text"
              // value={details.serving || ""}
              value={details.find((el) => el.name === "yield").value || ""}
              handleChange={(e) => {
                handleInput(e, "yield");
              }}
            />
          </div>
        </Article>
      </Section>
      <Section padding={`${spacing.xl} 0`}>
        <h5 className="vspacexs">Oven Prep</h5>
        <Article>
          <div className="flex">
            <div className="fourhalf">
              <Input
                name="degrees"
                placeholder="temperature"
                suffix={details.find((el) => el.name === "oven").unit}
                shape="underline"
                type="number"
                inputmode="decimal"
                value={details.find((el) => el.name === "oven").value}
                handleChange={(e) => {
                  handleInput(e, "oven");
                }}
              />
            </div>
            <div className="fourhalf">
              <Input
                name="duration"
                placeholder="duration"
                suffix={details.find((el) => el.name === "bake").unit}
                shape="underline"
                type="number"
                inputmode="decimal"
                // value={details.duration}
                value={details.find((el) => el.name === "bake").value}
                handleChange={(e) => {
                  handleInput(e, "bake");
                }}
              />
            </div>
          </div>
        </Article>
      </Section>
      <BtnContainer>
        <FilledButton
          label={editMode ? "Save" : "Next"}
          primaryColor={defaultTheme.secondaryColor}
          shape="pill"
          fullwidth
          handleClick={handleNext}
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
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addRecipe, addDetails, editRecipe })(
  NewIngredients
);
