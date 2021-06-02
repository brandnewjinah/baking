import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import styled, { css } from "styled-components";

//import token
import { spacing, neutral } from "../../components/token";

//redux
import { connect } from "react-redux";
import { addDirections } from "../../reducers/recipeReducer";

const RecipeDetail = (props) => {
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);

  const thisRecipe = props.recipes.find(
    (item) => item.id === parseInt(recipeId)
  );

  const player = useRef(null);

  const handleTimestamp = (time) => {
    const times = time.split(":");
    const MM = parseInt(times[0]);
    const SS = parseInt(times[1]);

    const seconds = MM * 60 + SS;

    if (player.current !== null) {
      player.current.seekTo(seconds);
    }
  };

  return (
    <>
      {!thisRecipe ? (
        <Wrapper>no</Wrapper>
      ) : (
        <Wrapper>
          <Header>
            <h2>{thisRecipe.name}</h2>
            <p>{thisRecipe.category}</p>
          </Header>
          <PlayerContainer>
            <ReactPlayer
              ref={player}
              url={thisRecipe.url}
              className="react-player"
              controls
              playing
              width="100%"
              height="100%"
            />
          </PlayerContainer>

          <Section>
            <h4>Ingredients</h4>
            {thisRecipe.ingredients.map((item, idx) => (
              <Item>
                <div className="left">{`${item.amount}${item.unit}`}</div>
                <div>{item.ingredient}</div>
              </Item>
            ))}
          </Section>
          <Section>
            <h4>Directions</h4>
            {thisRecipe.directions.map((item, idx) => (
              <Item>
                <div
                  className="left"
                  onClick={() => handleTimestamp(item.timestamp)}
                >
                  {item.timestamp}
                </div>
                <div>
                  <span>{`${idx + 1}. `}</span>
                  <span>{item.direction}</span>
                </div>
              </Item>
            ))}
          </Section>
        </Wrapper>
      )}
    </>
  );
};

const Flex = css`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
`;

const PlayerContainer = styled.div`
  position: relative;
  padding-top: 56.25%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Section = styled.section`
  margin: 1em 0 2em;
`;

const Item = styled.div`
  ${Flex}
  border-bottom: 1px solid ${neutral[300]};
  padding: ${spacing.xxs} 0;

  .left {
    flex: 0 0 10%;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addDirections })(RecipeDetail);
