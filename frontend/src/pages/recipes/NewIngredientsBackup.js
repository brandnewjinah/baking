import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

//import layout components
import Wrapper from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";

//import components
import { Input } from "../../components/Input";
import {
  FilledButton,
  OutlinedButton,
  TextButton,
} from "../../components/Button";
import Select from "react-select";
import ResSelect from "../../components/ResSelect";

//import token
import {
  spacing,
  neutral,
  defaultTheme,
  typeScale,
} from "../../components/token";
import { Plus } from "../../assets/Icons";

//local data
import { groupedOptions } from "../../data/ingredientData";
import { metricMeasure } from "../../data/measureData";

//redux
import { connect } from "react-redux";
import { addRecipe, addIngredients } from "../../reducers/recipeReducer";

const NewIngredients = (props) => {
  const history = useHistory();
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);
  const thisRecipe = props.recipes.find((item) => item.id === recipeId);

  const [serving, setServing] = useState({
    serving: "",
  });

  const [ingredients, setIngredients] = useState([
    { id: 1, ingredient: "", amount: "", unit: "g" },
  ]);

  const [errors, setErrors] = useState({});

  const [showIng, setShowIng] = useState(false);

  const setSelected = (id, selected) => {
    // console.log(id, selected);
    // const newIngredients = [...ingredients];
    // let index = newIngredients.findIndex((item) => item.id === id);
    // let thisIngredient = newIngredients[index];
    // thisIngredient = {
    //   ...thisIngredient,
    //   id: id,
    //   ingredient: selected,
    // };
    // newIngredients[index] = thisIngredient;
    // setIngredients(newIngredients);
  };

  const handleModal = (name) => {
    setShowIng(!showIng);
  };

  const formatGroupLabel = (data) => <span>{data.label}</span>;

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      padding: ".3em 0",
      borderRadius: ".35em",
    }),
  };

  const handleSelect = (ing, name) => {
    const newIngredients = [...ingredients];
    const index = newIngredients.findIndex((item) => item.id === name.name);
    let thisIngredient = newIngredients[index];
    thisIngredient = {
      ...thisIngredient,
      ingredient: ing.label,
    };
    newIngredients[index] = thisIngredient;

    setIngredients(newIngredients);
  };

  const handleUnitSelect = (item, name) => {
    const newIngredients = [...ingredients];
    const index = newIngredients.findIndex((item) => item.id === name.name);
    let thisIngredient = newIngredients[index];
    thisIngredient = {
      ...thisIngredient,
      unit: item.value,
    };
    newIngredients[index] = thisIngredient;

    setIngredients(newIngredients);
  };

  const handleServingInput = ({ currentTarget: input }) => {
    let newServing = { ...serving };
    newServing[input.name] = input.value;
    setServing(newServing);
  };

  const handleInput = ({ currentTarget: input }) => {
    let newIngredients = [...ingredients];
    let index = newIngredients.findIndex((i) => i.id === parseInt(input.id));

    let currentItem = { ...newIngredients[index] };
    currentItem[input.name] = input.value;
    newIngredients[index] = currentItem;

    setIngredients(newIngredients);
  };

  const handleAdd = () => {
    let NewIngredients = [...ingredients];
    let id = NewIngredients[NewIngredients.length - 1].id + 1;
    NewIngredients = [
      ...NewIngredients,
      { id: id, ingredient: "", amount: "", unit: "g" },
    ];
    setIngredients(NewIngredients);
  };

  const handleIngDelete = (id) => {
    let NewIngredients = [...ingredients];
    NewIngredients = NewIngredients.filter((i) => i.id !== id);
    setIngredients(NewIngredients);
  };

  const handleNext = () => {
    props.addIngredients(ingredients, serving, recipeId);

    history.push(`/recipes/${recipeId}/directions`);
  };

  return (
    <Wrapper>
      <Heading kicker={thisRecipe.category} title={thisRecipe.name}></Heading>
      <Section>
        <p className="p3 upper">Serving Size</p>
        <Article>
          <div className="full ">
            <Input
              placeholder="e.g. 15cm Round Cake Pan"
              name="serving"
              type="text"
              value={serving.serving}
              handleChange={handleServingInput}
            />
          </div>
        </Article>
      </Section>
      <Section>
        <p className="p3 upper">Ingredients</p>
        {ingredients.map((item, idx) => (
          <Article key={idx}>
            <OutlinedButton
              label={
                item.ingredient && item.ingredient !== undefined
                  ? item.ingredient
                  : "Select"
              }
              shape="rounded"
              fullwidth
              thin
              color={neutral[200]}
              textColor={neutral[600]}
              handleClick={() => handleModal("category")}
            />

            {showIng && (
              <ResSelect
                setShowModal={setShowIng}
                id={item.id}
                name="Ingredient"
                data={groupedOptions}
                // setSelected={(id, selected) => setSelected(id, selected)}
                setSelected={() => console.log(item.id)}
              />
            )}

            <div className="flex">
              <div className="half ">
                <Input
                  id={item.id}
                  placeholder="Amount"
                  name="amount"
                  type="number"
                  value={item.amount}
                  handleChange={handleInput}
                />
              </div>

              <div className="half">
                <Select
                  name={item.id}
                  defaultValue={{ label: "gram", value: "g", id: 1 }}
                  options={
                    metricMeasure &&
                    metricMeasure.map((item) => ({
                      label: item.name,
                      value: item.value,
                      id: item.id,
                    }))
                  }
                  styles={selectStyles}
                  onChange={(event, name) => handleUnitSelect(event, name)}
                />
              </div>
            </div>
            {idx === 0 ? (
              <div></div>
            ) : (
              <div
                className="p2 center vspace"
                onClick={() => handleIngDelete(item.id)}
              >
                delete
              </div>
            )}
          </Article>
        ))}
      </Section>
      <Add>
        <Plus width={20} height={20} color="#000" stroke={2} />
        {/* <Button label="Add More" variant="tertiary" handleClick={handleAdd} /> */}
        <TextButton label="Add More" handleClick={handleAdd} />
      </Add>
      <Buttons>
        {/* <Button label="Next" variant="primary" handleClick={handleNext} /> */}
        <FilledButton
          label="Next"
          color={defaultTheme.secondaryColor}
          shape="rounded"
          fullwidth
          handleClick={handleNext}
        />
      </Buttons>
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const Wrapper = styled.div`

//   .sbody {
//     font-size: ${typeScale.sbody};
//     color: ${neutral[500]};
//     letter-spacing: 0.025rem;
//   }

//   .upper {
//     text-transform: uppercase;
//   }
// `;

const Section = styled.section`
  padding: ${spacing.s} 0;

  .p3 {
    letter-spacing: 0.03rem;
    color: ${neutral[400]};
  }
`;

const Article = styled.article`
  width: 100%;
  border-bottom: 1px solid ${neutral[200]};
  padding: ${spacing.m} 0;

  .full {
    flex: 0 0 100%;
    /* padding: ${spacing.xxs} 0; */
  }

  .half {
    flex: 0 0 49.5%;
    padding: ${spacing.xxs} 0;
  }

  .flex {
    ${Flex}
    justify-content: space-between;
  }

  button {
    width: 100%;
  }
`;

const Add = styled.div`
  ${Flex}
  padding: ${spacing.m} 0;
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

export default connect(mapStateToProps, { addRecipe, addIngredients })(
  NewIngredients
);
