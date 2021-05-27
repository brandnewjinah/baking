import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import styled, { css } from "styled-components";

//import componts
import { Input } from "../../components/Input";
import { Button } from "../../components/Buttons";

//local data
import { groupedOptions } from "../../data/ingredientData";
import { metricMeasure } from "../../data/measureData";

//redux
import { connect } from "react-redux";
import { addRecipe, addIngredients } from "../../reducers/recipeReducer";

const NewIngredients = (props) => {
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);
  const thisRecipe = props.recipes.find((item) => item.id === recipeId);

  const [ingredients, setIngredients] = useState([
    { id: 1, ingredient: "", amount: "", unit: "" },
    { id: 2, ingredient: "", amount: "", unit: "" },
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

  const handleInput = ({ currentTarget: input }) => {
    let newIngredients = [...ingredients];
    let index = newIngredients.findIndex((i) => i.id === parseInt(input.id));

    let currentItem = { ...newIngredients[index] };
    currentItem[input.name] = input.value;
    newIngredients[index] = currentItem;

    setIngredients(newIngredients);
  };

  console.log(ingredients);

  const handleAdd = () => {
    let NewIngredients = [...ingredients];
    let id = NewIngredients[NewIngredients.length - 1].id + 1;
    NewIngredients = [
      ...NewIngredients,
      { id: id, ingredient: "", amount: "", unit: "" },
    ];
    setIngredients(NewIngredients);
  };

  const handleNext = () => {
    props.addIngredients(ingredients);

    // let newId =
    //   props.recipes && props.recipes.length > 0 ? props.recipes.length + 1 : 1;
    // let newRecipe = { ...recipe, id: newId };

    // history.push(`/recipes/${newId}/ingredients`);
  };

  return (
    <Wrapper>
      <Header>
        <h2>{thisRecipe.name}</h2>
        <p>{thisRecipe.category}</p>
      </Header>
      {ingredients.map((item, idx) => (
        <Item key={idx}>
          <div className="left">
            <Select
              name={item.id}
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              onChange={(event, name) => handleSelect(event, name)}
            />
          </div>
          <div className="center">
            <Input
              id={item.id}
              placeholder="Amount"
              name="amount"
              value={item.amount}
              handleChange={handleInput}
            />
          </div>
          <div className="right">
            <Select
              name="metricMeasure"
              // placeholder="Select"
              defaultValue={{ label: "gram", value: "g", id: 1 }}
              options={
                metricMeasure &&
                metricMeasure.map((item) => ({
                  label: item.name,
                  value: item.name,
                  id: item.id,
                }))
              }
              // onChange={(event, name) => handleCategorySelect(event, name)}
            />
          </div>
        </Item>
      ))}
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
`;

const Item = styled.div`
  ${Flex}
  justify-content: space-between;
  width: 100%;
  margin: 1.5rem 0;

  .left {
    flex: 0 0 49%;
  }

  .center {
    flex: 0 0 19%;
  }

  .right {
    flex: 0 0 29%;
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
