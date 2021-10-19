import React, { useRef, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import "./styles.css";
import styled from "styled-components";

//import layout components
import { Wrapper, WrapperFull } from "../../components/layout/Wrapper";
import Heading from "../../components/layout/Heading";
import {
  Divider,
  Section,
  Article,
  Div,
  Header,
} from "../../components/layout/Containers";

//import components
import { FilledButton, TextButton } from "../../components/Button";

//import token
import { spacing, primaryColor } from "../../components/token";

//redux
import { connect } from "react-redux";
import { addDirections, deleteRecipe } from "../../reducers/recipeReducer";

const RecipeDetail = (props) => {
  let history = useHistory();
  //this recipe
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);

  const thisRecipe = props.recipes.find(
    (item) => item.id === parseInt(recipeId)
  );

  //react player
  const player = useRef(null);
  const [resume, setResume] = useState(false);

  const handleTimestamp = (min, sec) => {
    const MM = parseInt(min);
    const SS = parseInt(sec);

    const seconds = MM * 60 + SS;

    if (player.current !== null) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      player.current.seekTo(seconds);
    }
    setResume(true);
  };

  //edit recipe
  const [EditMode, setEditMode] = useState(false);
  const handleEdit = (id) => {
    history.push(`/recipe/edit/${recipeId}/${id}`);
    // props.deleteRecipe(recipeId); //add to redux
    // history.push("/recipes");
  };

  const handleDelete = () => {};

  return (
    <>
      <WrapperFull>
        <PlayerContainer>
          <ReactPlayer
            ref={player}
            url={thisRecipe.youtube}
            className="react-player"
            controls
            playing={resume}
            width="100%"
            height="100%"
          />
        </PlayerContainer>
      </WrapperFull>
      <Wrapper>
        <Heading
          kicker={thisRecipe.category.name}
          title={thisRecipe.name}
          subtitle={thisRecipe.description}
          helper={thisRecipe.author.name}
        />
        {EditMode && (
          <TextButton
            label="Edit"
            primaryColor={primaryColor.yellow}
            handleClick={() => handleEdit("info")}
          />
        )}
        <Divider />

        <Section padding={`${spacing.xl} 0`}>
          <h5 className="vspacexs">Basic</h5>
          {thisRecipe.details.map((item, idx) => (
            <Div className="flex" padding={`${spacing.xxxxs} 0`}>
              <div className="three">
                <p className="p2 capitalize">{item.name}</p>
              </div>
              <div className="seven">
                <p className="p2">
                  <span>{item.value}</span>
                  {item.unit && <span> {item.unit}</span>}
                </p>
              </div>
            </Div>
          ))}

          {EditMode && (
            <TextButton
              label="Edit"
              primaryColor={primaryColor.yellow}
              handleClick={() => handleEdit("details")}
            />
          )}
        </Section>
        <Divider />

        <Section padding={`${spacing.xl} 0`}>
          <h5 className="vspacexs">Ingredients</h5>
          {thisRecipe.ingredients.map((group, idx) => (
            <Article padding={`0 0 ${spacing.l}`}>
              <Header className="p3 bold" padding={`${spacing.xxs} 0`}>
                {group.group}
              </Header>
              {group.items.map((item, idx) => (
                <Div className="flex" padding={`${spacing.xxxxs} 0`}>
                  <div className="six">
                    <p className="p2">{item.ingredient}</p>
                  </div>
                  <div className="four">
                    <p className="p2">{`${item.amount}${item.unit}`}</p>
                  </div>
                </Div>
              ))}
            </Article>
          ))}
          {EditMode && (
            <TextButton
              label="Edit"
              primaryColor={primaryColor.yellow}
              handleClick={() => handleEdit("ingredients")}
            />
          )}
        </Section>
        <Divider />
        <Section padding={`${spacing.xl} 0`}>
          <h5 className="vspacexs">Directions</h5>
          {thisRecipe.directions.map((item, idx) => (
            <Div className="p2" padding={`0 0 ${spacing.l}`}>
              <span className="bold">{`${item.id}. `}</span>
              <span>{item.direction}</span>
              <span>
                <FilledButton
                  label={`${item.minutes}:${item.seconds}`}
                  size="small"
                  shape="rounded"
                  primaryColor={primaryColor.yellow}
                  secondaryColor={primaryColor.lightyellow}
                  handleClick={() =>
                    handleTimestamp(item.minutes, item.seconds)
                  }
                />
              </span>
            </Div>
          ))}
          {EditMode && (
            <TextButton
              label="Edit"
              primaryColor={primaryColor.yellow}
              handleClick={() => handleEdit("directions")}
            />
          )}
        </Section>
        <Divider />
        {EditMode ? (
          <>
            <TextButton
              label="Cancel"
              primaryColor={primaryColor.yellow}
              handleClick={() => setEditMode(!EditMode)}
            />
            <TextButton
              label="Delete"
              primaryColor={primaryColor.yellow}
              handleClick={handleDelete}
            />
          </>
        ) : (
          <TextButton
            label="Edit"
            primaryColor={primaryColor.yellow}
            handleClick={() => setEditMode(!EditMode)}
          />
        )}
      </Wrapper>
    </>
  );
};

const PlayerContainer = styled.section`
  position: relative;
  padding-top: 56.25%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, {
  addDirections,
  deleteRecipe,
})(RecipeDetail);
