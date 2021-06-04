import React, { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "./styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";

//import components
import { Input } from "../../components/Input";

//import token
import {
  spacing,
  neutral,
  typeScale,
  primaryColor,
  tertiaryFont,
} from "../../components/token";

//redux
import { connect } from "react-redux";
import { addDirections } from "../../reducers/recipeReducer";

const RecipeDetail = (props) => {
  //this recipe
  let { recipeId } = useParams();
  recipeId = parseInt(recipeId);

  const thisRecipe = props.recipes.find(
    (item) => item.id === parseInt(recipeId)
  );

  //this ingredients
  const [ingredients, setIngredients] = useState([...thisRecipe.ingredients]);

  //react player
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

  //modal
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const [value, setValue] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    let id = parseInt(input.id);
    let reference = input.value;
    let newIngredients = [...ingredients];
    let index = newIngredients.findIndex((i) => i.id === parseInt(id));
    let currentItem = { ...newIngredients[index] };
    currentItem[input.name] = reference;
    newIngredients[index] = currentItem;
    setIngredients(newIngredients);

    const filtered = newIngredients.filter((item) => item.id != id);
    filtered.map((item) => (item.amount = item.amount * reference));

    let updatedIngredients = [...filtered, currentItem];

    setIngredients(updatedIngredients);
  };

  const calcNew = (amount) => {
    return amount;
  };

  return (
    <>
      {!thisRecipe ? (
        <Wrapper>no</Wrapper>
      ) : (
        <Wrapper>
          <Header>
            <span className="overline">{thisRecipe.category}</span>
            <h2 className="title">{thisRecipe.name}</h2>
            <p className="helper">by {thisRecipe.author}</p>
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
          <About>section</About>
          <Container>
            <Section>
              <Article>
                <Flex>
                  <h5>Ingredients</h5>
                  <div className="txtBtn" onClick={toggleModal}>
                    adjust
                  </div>

                  <Modal open={open} onClose={toggleModal} center>
                    <h6>Adjust</h6>
                    {ingredients.map((item, idx) => (
                      <Item key={idx}>
                        <div className="left">
                          <Input
                            id={item.id}
                            name="amount"
                            value={item.amount}
                            handleChange={handleChange}
                          />
                        </div>
                        <div>{item.ingredient}</div>
                      </Item>
                    ))}
                  </Modal>
                </Flex>
                {ingredients.map((item, idx) => (
                  <Item key={idx}>
                    <div className="left">{`${item.amount}${item.unit}`}</div>
                    <div>{item.ingredient}</div>
                  </Item>
                ))}
              </Article>
              <Article>
                <h5>Directions</h5>
                {thisRecipe.directions.map((item, idx) => (
                  <Item key={idx}>
                    <div
                      className="left"
                      onClick={() => handleTimestamp(item.timestamp)}
                    >
                      {item.timestamp}
                    </div>
                    <div>
                      {/* <span>{`${idx + 1}. `}</span> */}
                      <span>{item.direction}</span>
                    </div>
                  </Item>
                ))}
              </Article>
            </Section>
            <Section>
              <Link to={`/recipes/edit/${recipeId}`}>edit</Link>
            </Section>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${spacing.xxl};
`;

const Header = styled.header`
  text-align: center;
  padding-bottom: ${spacing.xl};

  .overline {
    text-transform: uppercase;
    font-size: ${typeScale.helper};
    font-weight: 500;
    letter-spacing: 0.0125rem;
    color: ${primaryColor.gold};
    border-bottom: 1px solid ${primaryColor.gold};
    display: inline-block;
    line-height: 2;
  }

  .title {
    font-family: ${tertiaryFont};
    color: ${neutral[600]};
    margin: ${spacing.xxxs} 0;
  }

  .helper {
    font-size: ${typeScale.helper};
    font-weight: 400;
    color: ${neutral[400]};
  }
`;

const PlayerContainer = styled.section`
  position: relative;
  padding-top: 56.25%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const About = styled.section`
  width: 100;
  background-color: ${neutral[100]};
  padding: ${spacing.xl} 0;
`;

const Section = styled.section`
  padding: ${spacing.xl} 0;
`;

const Article = styled.article`
  padding: ${spacing.l} 0;

  h5 {
    font-family: ${tertiaryFont};
    font-weight: 600;
    color: ${neutral[600]};
    padding-bottom: ${spacing.m};
  }

  .txtBtn {
    font-size: ${typeScale.helper};
    cursor: pointer;
  }

  .react-responsive-modal-modal {
    width: 100%;
    height: 100%;
  }
`;

const Item = styled.div`
  display: flex;
  font-size: ${typeScale.sbody};
  border-bottom: 1px solid ${neutral[100]};
  padding: ${spacing.xxs} 0;

  .left {
    flex: 0 0 20%;
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
