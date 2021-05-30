import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

//import componts
import { Input } from "../../components/Input";
import { Button } from "../../components/Buttons";

//import token
import { spacing, neutral } from "../../components/token";

//redux
import { connect } from "react-redux";
import { addDirections } from "../../reducers/recipeReducer";

const NewDirections = (props) => {
  let history = useHistory();
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);

  const thisRecipe = props.recipes.find(
    (item) => item.id === parseInt(recipeId)
  );

  const [directions, setDirections] = useState([
    { id: 1, direction: "", timestamp: "" },
  ]);

  const handleInput = ({ currentTarget: input }) => {
    let id = input.id.split("?")[0];
    let newDirections = [...directions];
    let index = newDirections.findIndex((i) => i.id === parseInt(id));
    let currentItem = { ...newDirections[index] };
    currentItem[input.name] = input.value;
    newDirections[index] = currentItem;
    setDirections(newDirections);
  };

  const handleAdd = () => {
    let newDirections = [...directions];
    let id = newDirections[newDirections.length - 1].id + 1;
    newDirections = [
      ...newDirections,
      { id: id, direction: "", timestamp: "" },
    ];
    setDirections(newDirections);
  };

  const handleSave = () => {
    props.addDirections(directions, recipeId);

    history.push(`/recipes`);
  };

  return (
    <Wrapper>
      <Header>
        <h2>{thisRecipe.name}</h2>
        <p>{thisRecipe.category}</p>
      </Header>
      <Section>
        <header>Directions</header>
        {directions.map((item, idx) => (
          <Item key={idx}>
            <div className="flex">
              <div className="half">{item.id}</div>
              <div className="onehalf">
                <Input
                  id={`${item.id}?timestamp`}
                  name="timestamp"
                  placeholder="00:00"
                  value={item.timestamp}
                  handleChange={handleInput}
                />
              </div>
              <div className="eight">
                <Input
                  id={`${item.id}?direction`}
                  name="direction"
                  placeholder="Add directions"
                  value={item.direction}
                  handleChange={handleInput}
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
        <Button
          label="Save Recipe"
          variant="primary"
          handleClick={handleSave}
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

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
`;

const Section = styled.section``;

const Item = styled.article`
  .flex {
    ${Flex}
    justify-content: space-between;
  }

  .half {
    flex: 0 0 4.5%;
    padding: ${spacing.xxs} 0;
  }

  .onehalf {
    flex: 0 0 14.5%;
    padding: ${spacing.xxs} 0;
  }

  .eight {
    flex: 0 0 79.5%;
    padding: ${spacing.xxs} 0;
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

export default connect(mapStateToProps, { addDirections })(NewDirections);
