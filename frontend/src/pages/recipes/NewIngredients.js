import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

//import layout components
import Wrapper from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";

//import components
import { Input } from "../../components/Input";
import { FilledButton, TextButton } from "../../components/Button";
import Select from "react-select";
import ResSelect from "../../components/ResSelect";

//import token
import { spacing, neutral, blue, defaultTheme } from "../../components/token";
import { Plus } from "../../assets/Icons";

//local data
import { groupedOptions } from "../../data/ingredientData";
import { metricMeasure } from "../../data/measureData";

//redux
import { connect } from "react-redux";
import { addRecipe, addIngredients } from "../../reducers/recipeReducer";

const NewIngredients = (props) => {
  const history = useHistory();

  //this recipe info
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);
  const thisRecipe = props.recipes.find((item) => item.id === recipeId);

  //handle serving
  const [serving, setServing] = useState("");

  const handleServingInput = ({ currentTarget: input }) => {
    setServing(input.value);
  };

  //handle ingredients
  const [ingredients, setIngredients] = useState([
    {
      id: 1,
      group: "",
      items: [{ id: 1, ingredient: "", amount: "", unit: "g" }],
    },
  ]);

  //handle modal
  const [showIng, setShowIng] = useState(false);
  const [current, setCurrent] = useState({});
  const handleModal = (group, ingredient) => {
    setShowIng(!showIng);
    setCurrent({ group, ingredient });
  };

  //global methods to find current group and ingredient
  const newIngredients = [...ingredients];

  const findGroup = (group) => {
    let GroupIndex = newIngredients.findIndex((item) => item.id === group);
    let thisGroup = {
      index: GroupIndex,
      ...newIngredients[GroupIndex],
    };
    return thisGroup;
  };

  //select ingredient
  const handleSelected = (group, ingredient, selected) => {
    let thisGroup = findGroup(group);

    //find current item
    let itemIndex = thisGroup.items.findIndex((item) => item.id === ingredient);
    let thisIngredient = thisGroup.items[itemIndex];

    thisIngredient = {
      ...thisIngredient,
      id: selected.id,
      ingredient: selected.label,
    };

    thisGroup.items[itemIndex] = thisIngredient;
    newIngredients[thisGroup.index] = thisGroup;
    setIngredients(newIngredients);
  };

  //add amount
  const handleAmount = ({ currentTarget: input }, group, ingredient) => {
    let thisGroup = findGroup(group);

    //find current item
    let itemIndex = thisGroup.items.findIndex((item) => item.id === ingredient);
    let thisIngredient = thisGroup.items[itemIndex];

    //set amount value
    thisIngredient = {
      ...thisIngredient,
      amount: input.value,
    };
    thisGroup.items[itemIndex] = thisIngredient;
    newIngredients[thisGroup.index] = thisGroup;
    setIngredients(newIngredients);
  };

  const handleUnit = (e, group, ingredient) => {
    let thisGroup = findGroup(group);

    //find current item
    let itemIndex = thisGroup.items.findIndex((item) => item.id === ingredient);
    let thisIngredient = thisGroup.items[itemIndex];

    //set unit
    thisIngredient = {
      ...thisIngredient,
      unit: e.value,
    };
    thisGroup.items[itemIndex] = thisIngredient;
    newIngredients[thisGroup.index] = thisGroup;
    setIngredients(newIngredients);
  };

  //add item
  const handleAddItem = (group) => {
    let thisGroup = findGroup(group);
    let thisGroupItems = thisGroup.items;
    let id = thisGroupItems[thisGroupItems.length - 1].id + 1;

    thisGroupItems = [
      ...thisGroupItems,
      { id, ingredient: "", amount: "", unit: "g" },
    ];

    thisGroup = {
      ...thisGroup,
      items: thisGroupItems,
    };

    newIngredients[thisGroup.index] = thisGroup;
    setIngredients(newIngredients);
  };

  //add group
  const handleAddGroup = () => {
    let NewIngredients = [...ingredients];
    let id = NewIngredients[NewIngredients.length - 1].id + 1;
    NewIngredients = [
      ...NewIngredients,
      {
        id,
        group: "",
        items: [{ id: 1, ingredient: "", amount: "", unit: "g" }],
      },
    ];
    setIngredients(NewIngredients);
  };

  //delete ingredient
  const handleDeleteItem = (group, ingredient) => {
    let thisGroup = findGroup(group);

    //delete current item
    let thisGroupItems = thisGroup.items;
    thisGroupItems = thisGroupItems.filter((i) => i.id !== ingredient);
    thisGroup = {
      ...thisGroup,
      items: thisGroupItems,
    };
    newIngredients[thisGroup.index] = thisGroup;
    setIngredients(newIngredients);
  };

  //delete group
  const handleDeleteGroup = (group) => {
    //find current group
    let newIngredients = [...ingredients];
    newIngredients = newIngredients.filter((i) => i.id !== group);

    setIngredients(newIngredients);
  };

  //Next buttom
  const handleNext = () => {
    props.addIngredients(ingredients, serving, recipeId);
    history.push(`/recipes/${recipeId}/directions`);
  };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      padding: ".3em 0",
      borderRadius: ".35em",
      border: "none",
    }),
    valueContainer: (styles) => ({
      ...styles,
      padding: ".3em .5em",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      padding: "4px",
    }),
  };

  return (
    <Wrapper>
      <Heading
        kicker={thisRecipe.category.value}
        title={thisRecipe.name}
      ></Heading>
      <Section>
        <header className="p3 upper">Serving Size</header>
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
        <header className="p3 upper">Ingredients</header>
        {ingredients.map((group, idx) => (
          <Group>
            <Input placeholder="Group name" name="amount" shape="underline" />
            {group.items.map((item, idx) => (
              <Article key={idx}>
                <div className="flex">
                  <div className="fivehalf">
                    <div onClick={() => handleModal(group.id, item.id)}>
                      {item.ingredient && item.ingredient !== undefined
                        ? item.ingredient
                        : "Select"}
                    </div>
                    {showIng && (
                      <ResSelect
                        setShowModal={setShowIng}
                        id={current.ingredient}
                        group={current.group}
                        name="Ingredient"
                        data={groupedOptions}
                        setSelected={(group, id, selected) =>
                          handleSelected(group, id, selected)
                        }
                      />
                    )}
                  </div>
                  <div className="fourhalf flex">
                    <div className="five">
                      <Input
                        id={item.id}
                        placeholder="Amount"
                        name="amount"
                        type="number"
                        inputmode="decimal"
                        shape="underline"
                        value={item.amount}
                        handleChange={(e) => {
                          handleAmount(e, group.id, item.id);
                        }}
                      />
                    </div>
                    <div className="five">
                      <Select
                        name={item.id}
                        defaultValue={{ label: "g", value: "g", id: 1 }}
                        options={
                          metricMeasure &&
                          metricMeasure.map((item) => ({
                            label: item.name,
                            value: item.value,
                            id: item.id,
                          }))
                        }
                        components={{
                          IndicatorSeparator: () => null,
                        }}
                        styles={selectStyles}
                        onChange={(e) => {
                          handleUnit(e, group.id, item.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Article>
            ))}
            <Add>
              <TextButton
                label="Add Item"
                handleClick={() => handleAddItem(group.id)}
              />
            </Add>
            {idx === 0 ? (
              <div></div>
            ) : (
              <Add>
                <TextButton
                  label="Delete Group"
                  handleClick={() => handleDeleteGroup(group.id)}
                />
              </Add>
            )}
          </Group>
        ))}
        <Add>
          <TextButton label="Add Group" handleClick={handleAddGroup} />
        </Add>
      </Section>

      <Buttons>
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

const Section = styled.section`
  padding: ${spacing.s} 0;

  .flex {
    ${Flex}
    justify-content: space-between;
  }
`;

const Group = styled.article`
  /* background-color: ${blue[10]};*/
  border-radius: ${spacing.m};
  padding: ${spacing.m} ${spacing.xs};
  border: 1px solid ${neutral[100]};
  margin: ${spacing.xl} 0;
`;

const Article = styled.article`
  width: 100%;
  /* border-bottom: 1px solid ${neutral[200]}; */
  padding: ${spacing.xxs} 0;

  .full {
    flex: 0 0 100%;
    /* padding: ${spacing.xxs} 0; */
  }

  .half {
    flex: 0 0 49.5%;
    padding: ${spacing.xxs} 0;
  }

  button {
    width: 100%;
  }
`;

const Add = styled.div`
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
