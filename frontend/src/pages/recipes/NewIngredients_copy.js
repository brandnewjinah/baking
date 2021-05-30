import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components";

//import componts
import { Input } from "../../components/Input";
import { Button } from "../../components/Buttons";
import NewIngSearch from "./NewIngSearch";

//import token
import { spacing, neutral } from "../../components/token";

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

  const [currentIndex, setCurrentIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(!open);

  const setTest = (id) => {
    setCurrentIndex(id);
    setOpen(!open);
  };

  const handleChange = ({ currentTarget: input }) => {
    let newIng = [...ingredients];
    const index = newIng.findIndex((item) => item.id === currentIndex);
    // newIng[index][input.name] = input.value;
    // setIngredients(newIng);
  };

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
    <Section>
      <Header>
        <h2>{thisRecipe.name}</h2>
        <p>{thisRecipe.category}</p>
      </Header>
      <Article>
        <header>Ingredients</header>
        {ingredients.map((item, idx) => (
          <div key={idx}>
            <Item>
              <div className="top" onClick={() => setTest(item.id)}>
                <MockInput>
                  <p>{item.ingredient}</p>
                </MockInput>
              </div>
              <div className="bottom">
                <div className="left">
                  {/* <Input placeholder="Amount" value={ingredients[0].amount} /> */}
                  <Input
                    placeholder="Amount"
                    type="decimal"
                    name="amount"
                    handleChange={handleChange}
                  />
                </div>
                <div className="right">grams</div>
              </div>
            </Item>

            {open && (
              <NewIngSearch
                name="ingredient"
                handleClick={onOpenModal}
                handleChange={handleChange}
              />
            )}
          </div>
        ))}
      </Article>
      <Buttons>
        <Button label="Next" variant="primary" handleClick={handleNext} />
      </Buttons>
    </Section>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Section = styled.section`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
`;

const Article = styled.article`
  width: 100%;
  margin: 1.5rem 0;

  header {
    font-size: 0.875rem;
    margin: 0.875em 0;
  }
`;

const Item = styled.div`
  border-bottom: 1px solid ${neutral[200]};
  padding: ${spacing.l} 0;

  .bottom {
    ${Flex}
    justify-content: space-between;
  }

  .left {
    flex: 0 0 49%;
  }

  .right {
    flex: 0 0 49%;
  }
`;

const MockInput = styled.div`
  ${Flex}
  justify-content: start;
  width: 100%;
  font-size: 1rem;
  height: 2.5rem;
  border: 1px solid ${neutral[200]};
  border-radius: ${spacing.xxs};
  padding: ${spacing.xs};

  p {
    color: ${neutral[400]};
  }
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
