import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

//import layout components
import { Wrapper, WrapperFull } from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";
import {
  Section,
  Article,
  BtnContainer,
} from "../../components/layout/Containers";

//import components
import { Input, Floating } from "../../components/Input";
import { FilledButton, TextButton, IconButton } from "../../components/Button";
import Select from "react-select";
import ResSelect from "../../components/ResSelect";

//import token
import {
  spacing,
  neutral,
  blue,
  defaultTheme,
  primaryColor,
} from "../../components/token";
import { Close } from "../../assets/Icons";

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

  //add group name
  const handleGroup = ({ currentTarget: input }, group) => {
    let thisGroup = findGroup(group);

    //set group name
    thisGroup = {
      ...thisGroup,
      group: input.value,
    };

    newIngredients[thisGroup.index] = thisGroup;
    setIngredients(newIngredients);
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
    props.addIngredients(ingredients, recipeId);
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
      color: primaryColor.yellow,
      padding: "4px",
    }),
  };

  return (
    <>
      <Wrapper>
        <Heading
          title="Add ingredients"
          subtitle="Group ingredients? add title lorem "
        ></Heading>
      </Wrapper>
      <WrapperFull>
        <Section>
          <div className="background">
            {ingredients.map((group, idx) => (
              <Group>
                <div className="nameContainer">
                  <Floating
                    label="Group title"
                    name="amount"
                    handleChange={(e) => {
                      handleGroup(e, group.id);
                    }}
                  />
                </div>
                {group.items.map((item, idx) => (
                  <Article key={idx} padding={`0 0 ${spacing.l}`}>
                    <div className="flex">
                      <div className="five">
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
                      <div className="four flex">
                        <div className="five">
                          <Input
                            id={item.id}
                            placeholder="Amount"
                            small={true}
                            name="amount"
                            type="number"
                            inputmode="decimal"
                            shape="underline"
                            align="right"
                            value={item.amount}
                            handleChange={(e) => {
                              handleAmount(e, group.id, item.id);
                            }}
                          />
                        </div>
                        <div className="fourhalf">
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
                      {idx === 0 ? (
                        <div className="one"></div>
                      ) : (
                        <div className="one flexEnd">
                          <IconButton
                            handleClick={() =>
                              handleDeleteItem(group.id, item.id)
                            }
                          >
                            <Close
                              width={10}
                              height={10}
                              color={neutral[300]}
                              stroke={3}
                            />
                          </IconButton>
                        </div>
                      )}
                    </div>
                  </Article>
                ))}

                {idx === 0 ? (
                  <Add>
                    <TextButton
                      label="Add Item"
                      primaryColor={primaryColor.yellow}
                      handleClick={() => handleAddItem(group.id)}
                    />
                  </Add>
                ) : (
                  <div className="flex">
                    <Add>
                      <TextButton
                        label="Add Item"
                        primaryColor={primaryColor.yellow}
                        handleClick={() => handleAddItem(group.id)}
                      />
                    </Add>
                    <TextButton
                      label="Delete Group"
                      primaryColor={neutral[300]}
                      handleClick={() => handleDeleteGroup(group.id)}
                    />
                  </div>
                )}
              </Group>
            ))}
          </div>
        </Section>
        <Add>
          <FilledButton
            label="Add Group"
            primaryColor={primaryColor.yellow}
            secondaryColor={primaryColor.lightyellow}
            size="small"
            shape="pill"
            handleClick={handleAddGroup}
          />
        </Add>
        <Wrapper>
          <BtnContainer>
            <FilledButton
              label="Next"
              primaryColor={defaultTheme.secondaryColor}
              shape="pill"
              fullwidth
              handleClick={handleNext}
            />
          </BtnContainer>
        </Wrapper>
      </WrapperFull>
    </>
  );
};

const Group = styled.article`
  padding: 1.35rem;
  border: 1px solid ${neutral[100]};
  border-radius: ${spacing.xl};
  margin-bottom: ${spacing.xxs};

  .nameContainer {
    margin-bottom: ${spacing.xl};
  }
`;

const Add = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xl} 0;
`;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addRecipe, addIngredients })(
  NewIngredients
);
