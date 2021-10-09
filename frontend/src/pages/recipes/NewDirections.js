import React, { useState, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

//import layout components
import Wrapper from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";

//import componts
import { Input, TextArea } from "../../components/Input";
import { FilledButton, TextButton } from "../../components/Button";

//import token
import { spacing, neutral, defaultTheme } from "../../components/token";

//redux
import { connect } from "react-redux";
import { addDirections } from "../../reducers/recipeReducer";

const NewDirections = (props) => {
  let history = useHistory();
  let location = useLocation();

  //this Recipe
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);
  const thisRecipe = props.recipes.find(
    (item) => item.id === parseInt(recipeId)
  );

  //prep
  const [prep, setPrep] = useState({
    degrees: "",
    degreeUnit: "°C",
    duration: "",
    durationUnit: "min",
  });

  const handlePrepInput = ({ currentTarget: input }) => {
    let newPrep = { ...prep };
    newPrep[input.name] = input.value;
    setPrep(newPrep);
  };

  //add directions
  const [directions, setDirections] = useState([
    { id: 1, direction: "", timestamp: "" },
  ]);

  const handleInput = ({ currentTarget: input }) => {
    let id = input.id.split("?")[0];
    let newDirections = [...directions];
    let index = newDirections.findIndex((i) => i.id === parseInt(id));
    let currentItem = { ...newDirections[index] };

    //if input.name is timestamp
    if (input.name === "timestamp") {
      let replaceTime = input.value.replace(/\:/g, "");

      if (replaceTime.length >= 3 && replaceTime.length < 5) {
        let min = replaceTime.substring(0, 2);
        let sec = replaceTime.substring(2, 4);
        input.value = min + ":" + sec;
      }
      currentItem.timestamp = input.value;
    }

    currentItem[input.name] = input.value;
    newDirections[index] = currentItem;
    setDirections(newDirections);
  };

  //add directions
  const handleAdd = () => {
    let newDirections = [...directions];
    let id = newDirections[newDirections.length - 1].id + 1;
    newDirections = [
      ...newDirections,
      { id: id, direction: "", timestamp: "" },
    ];
    setDirections(newDirections);
  };

  //delete directions
  const handleDirDelete = (id) => {
    let newDirections = [...directions];
    newDirections = newDirections.filter((i) => i.id !== id);
    setDirections(newDirections);
  };

  const handleSave = () => {
    props.addDirections(directions, prep, recipeId);
    history.push(`/recipes`);
  };

  // get data
  const getData = async () => {
    if (location.pathname.includes("/edit/")) {
      //from redux store
      const currentItem = await props.recipes.find((r) => r.id === recipeId);
      setDirections(currentItem.directions);
      setPrep(currentItem.prep);
    }
  };

  useEffect(() => {
    getData();
  }, [recipeId]);

  return (
    <Wrapper>
      <Heading
        kicker={thisRecipe.category.value}
        title={thisRecipe.name}
      ></Heading>
      <Section>
        <header className="p3 upper">Oven Prep</header>
        <Article>
          <div className="flex">
            <div className="five">
              <Input
                name="degrees"
                placeholder="temperature"
                suffix={prep.degreeUnit}
                type="number"
                value={prep.degrees}
                handleChange={handlePrepInput}
              />
            </div>
            <div className="five">
              <Input
                name="duration"
                placeholder="duration"
                suffix={prep.durationUnit}
                type="number"
                value={prep.duration}
                handleChange={handlePrepInput}
              />
            </div>
          </div>
        </Article>
      </Section>

      <Section>
        <header className="p3 upper">Add Directions</header>
        <p className="p3">
          Add a timestamp to jump to straight to a corresponding place in a
          video
        </p>
        {directions.map((item, idx) => (
          <Article key={idx}>
            <div className="flex">
              <div className="half p3">{idx + 1}</div>
              <div className="two">
                <Input
                  id={`${item.id}?timestamp`}
                  name="timestamp"
                  placeholder="mm:ss"
                  align="right"
                  maxLength={5}
                  value={item.timestamp}
                  handleChange={handleInput}
                />
              </div>
            </div>
            <div className="sevenhalf">
              <TextArea
                id={`${item.id}?direction`}
                name="direction"
                placeholder="Directions"
                value={item.direction}
                handleChange={handleInput}
              />
            </div>
            {idx === 0 ? (
              <div></div>
            ) : (
              <div
                className="helper center vspace"
                onClick={() => handleDirDelete(item.id)}
              >
                delete
              </div>
            )}
          </Article>
        ))}
        <Add>
          <TextButton label="Add More" handleClick={handleAdd} />
        </Add>
      </Section>

      <Buttons>
        {/* <Button label="Next" variant="primary" handleClick={handleNext} /> */}
        <FilledButton
          label="Save Recipe"
          color={defaultTheme.secondaryColor}
          shape="rounded"
          fullwidth
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

const Section = styled.section`
  border-bottom: 1px solid ${neutral[100]};
  padding: ${spacing.l} 0;

  header {
    padding-bottom: ${spacing.xs};
  }

  .p3 {
    letter-spacing: 0.03rem;
    color: ${neutral[400]};
  }
`;

const Article = styled.article`
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

export default connect(mapStateToProps, { addDirections })(NewDirections);
