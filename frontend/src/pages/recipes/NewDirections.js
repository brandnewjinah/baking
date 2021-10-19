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

//import componts
import { Input, TextArea } from "../../components/Input";
import {
  FilledButton,
  OutlinedButton,
  TextButton,
} from "../../components/Button";

//import token
import {
  spacing,
  neutral,
  defaultTheme,
  primaryColor,
} from "../../components/token";

//redux
import { connect } from "react-redux";
import { addDirections, editRecipe } from "../../reducers/recipeReducer";
import { isTemplateSpan } from "typescript";

const NewDirections = (props) => {
  let history = useHistory();
  let location = useLocation();
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);
  const editMode = location.pathname.includes("/edit");

  useEffect(() => {
    getData();
  }, []);

  // get data
  const getData = async () => {
    if (editMode) {
      //from redux store
      const currentItem = await props.recipes.find((r) => r.id === recipeId);
      setDirections(currentItem.directions);
    }
  };

  //add directions
  const [directions, setDirections] = useState([
    { id: 1, direction: "", minutes: "", seconds: "" },
  ]);

  const handleInput = ({ currentTarget: input }, id) => {
    //find current item
    let newDirections = [...directions];
    let itemIndex = newDirections.findIndex((item) => item.id === id);
    let thisItem = newDirections[itemIndex];

    if (input.name === "direction") {
      thisItem[input.name] = input.value;
    } else if (input.name === "seconds" || "minutes") {
      let value = input.value.substring(0, 2);
      //if value is one digit add 0 to the front
      // /^\d$/.value && (thisItem[input.name] = `0${value}`);
      value !== "" && undefined && NaN && (value = parseInt(value));
      value > 59 ? (thisItem[input.name] = "") : (thisItem[input.name] = value);
    }

    newDirections[itemIndex] = thisItem;
    setDirections(newDirections);
  };

  //add directions
  const handleAdd = () => {
    let newDirections = [...directions];
    let id = newDirections[newDirections.length - 1].id + 1;
    newDirections = [
      ...newDirections,
      { id: id, direction: "", minutes: "", seconds: "" },
    ];
    setDirections(newDirections);
  };

  //delete directions
  const handleDirDelete = (id) => {
    let newDirections = [...directions];
    newDirections = newDirections.filter((i) => i.id !== id);
    setDirections(newDirections);
  };

  const checkTimeStamp = () => {
    let newDirections = directions.map((item) =>
      item.minutes.match(/^\d$/)
        ? { ...item, minutes: `0${item.minutes}` }
        : item.seconds.match(/^\d$/)
        ? { ...item, seconds: `0${item.seconds}` }
        : item.minutes.match("")
        ? { ...item, minutes: "00" }
        : { ...item }
    );
    return newDirections;
  };

  //Next button
  const handleSave = () => {
    const newDirections = checkTimeStamp();
    if (editMode) {
      props.editRecipe("directions", newDirections, recipeId);
      alert("Updated");
      history.push(`/recipe/${recipeId}`);
    } else {
      props.addDirections(newDirections, recipeId);
      history.push(`/recipes`);
    }
  };

  const cancelEdit = () => {
    history.push(`/recipe/${recipeId}`);
  };

  return (
    <Wrapper>
      <Heading
        title={editMode ? "Edit directions" : "Add directions"}
      ></Heading>

      <Section padding={`${spacing.xl} 0`}>
        {directions.map((item, idx) => (
          <Article key={idx} padding={`0 0 ${spacing.l}`}>
            <div className="flex">
              <div className="one center p3">{idx + 1}</div>
              <div className="nine flex">
                <div className="fourhalf">
                  <Input
                    name="minutes"
                    suffix="minutes"
                    placeholder="mm"
                    maxLength={2}
                    type="number"
                    inputmode="decimal"
                    shape="underline"
                    value={item.minutes}
                    handleChange={(e) => {
                      handleInput(e, item.id);
                    }}
                  />
                </div>
                <div className="fourhalf">
                  <Input
                    name="seconds"
                    suffix="seconds"
                    placeholder="ss"
                    maxLength={2}
                    type="number"
                    inputmode="decimal"
                    shape="underline"
                    value={item.seconds}
                    handleChange={(e) => {
                      handleInput(e, item.id);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flexAlignTop">
              <div className="one"></div>
              <Div className="nine" padding={`${spacing.xl} 0`}>
                <TextArea
                  name="direction"
                  placeholder="Directions"
                  shape="underline"
                  rows={4}
                  value={item.direction}
                  handleChange={(e) => {
                    handleInput(e, item.id);
                  }}
                />

                {idx === 0 ? (
                  <div></div>
                ) : (
                  <Div className="flexEnd" padding={`${spacing.m} 0`}>
                    <TextButton
                      label="Delete"
                      primaryColor={neutral[300]}
                      handleClick={() => handleDirDelete(item.id)}
                    />
                  </Div>
                )}
              </Div>
            </div>
          </Article>
        ))}
        <Div className="flexCenter">
          <OutlinedButton
            label="Add Directions"
            primaryColor={primaryColor.yellow}
            secondaryColor={primaryColor.lightyellow}
            size="small"
            shape="pill"
            handleClick={handleAdd}
          />
        </Div>
      </Section>

      <BtnContainer>
        <FilledButton
          label={editMode ? "Save" : "Save Recipe"}
          primaryColor={defaultTheme.secondaryColor}
          shape="pill"
          fullwidth
          handleClick={handleSave}
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

export default connect(mapStateToProps, { addDirections, editRecipe })(
  NewDirections
);
