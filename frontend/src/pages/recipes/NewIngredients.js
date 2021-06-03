import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import styled, { css } from "styled-components";

//import componts
import { Input } from "../../components/Input";
import { Button } from "../../components/Buttons";

//import token
import {
  spacing,
  neutral,
  tertiaryFont,
  typeScale,
  primaryColor,
} from "../../components/token";

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

  const [ingredients, setIngredients] = useState([
    { id: 1, ingredient: "", amount: "", unit: "g" },
  ]);

  const formatGroupLabel = (data) => <span>{data.label}</span>;

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

  const handleNext = () => {
    props.addIngredients(ingredients, recipeId);

    history.push(`/recipes/${recipeId}/directions`);
  };

  return (
    <Wrapper>
      <Header>
        <p className="overline">{thisRecipe.category}</p>
        <h4 className="title">{thisRecipe.name}</h4>
      </Header>
      <Section>
        <header>Ingredients</header>
        {ingredients.map((item, idx) => (
          <Item key={idx}>
            <div className="full">
              <Select
                name={item.id}
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                onChange={(event, name) => handleSelect(event, name)}
              />
            </div>
            <div className="flex">
              <div className="half">
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
                  onChange={(event, name) => handleUnitSelect(event, name)}
                />
              </div>
            </div>
          </Item>
        ))}
      </Section>
      <Add>
        <Button label="Add More" handleClick={handleAdd} />
      </Add>
      <Buttons>
        <Button label="Next" variant="primary" handleClick={handleNext} />
      </Buttons>
    </Wrapper>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;

  .overline {
    text-transform: uppercase;
    font-size: ${typeScale.sbody};
    font-weight: 500;
    color: ${primaryColor.gold};
  }

  .title {
    font-family: ${tertiaryFont};
    color: ${neutral[600]};
    margin: ${spacing.xxxs} 0;
  }
`;

const Section = styled.section``;

const Item = styled.article`
  width: 100%;
  border-bottom: 1px solid ${neutral[200]};
  padding: ${spacing.l} 0;

  .full {
    flex: 0 0 100%;
    padding: ${spacing.xxs} 0;
  }

  .half {
    flex: 0 0 49.5%;
    padding: ${spacing.xxs} 0;
  }

  .flex {
    ${Flex}
    justify-content: space-between;
  }
`;

const Add = styled.div`
  ${Flex}
  margin: 2rem 0;
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
