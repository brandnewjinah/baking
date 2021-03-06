import React, { useRef, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
import "./styles.css";
import { Modal } from "react-responsive-modal";
import styled from "styled-components";

//import components
import { Input } from "../../components/Input";
import { TextButton } from "../../components/Button";

//import token
import {
  spacing,
  neutral,
  typeScale,
  primaryColor,
  tertiaryFont,
} from "../../components/token";

//import assets
import { Pencil } from "../../assets/Icons";

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

  //delete recipe
  const handleDelete = () => {
    props.deleteRecipe(recipeId); //add to redux
    history.push("/recipes");
  };

  return (
    <>
      {!thisRecipe ? (
        <Wrapper>no</Wrapper>
      ) : (
        <Wrapper>
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
          <Header>
            <p className="helper category">{thisRecipe.category}</p>
            <h1 className="title">{thisRecipe.name}</h1>
            {thisRecipe.description && (
              <p className="sbody">{thisRecipe.description}</p>
            )}
            <p className="helper">by {thisRecipe.author}</p>
            {/* <p className="helper">
              <Link to={`/recipe/edit/${recipeId}`}>edit</Link>
            </p> */}
          </Header>
          <Section>
            <div className="serving">
              <Element>
                <div className="helper vspace">Temp</div>
                <div className="sbody">350??F</div>
              </Element>
              <Element>
                <div className="helper vspace">Makes</div>
                <div className="sbody">15 x 15 x 8</div>
              </Element>
              <Element>
                <div className="helper vspace">Makes</div>
                <div className="sbody">15 x 15 x 8</div>
              </Element>
            </div>
          </Section>
          <Container>
            <Section>
              <Article>
                <Flex>
                  <div className="flex">
                    <h5>Ingredients</h5>
                    <Link to={`/recipe/edit/${recipeId}/ingredients`}>
                      <div>
                        <Pencil
                          width={16}
                          height={16}
                          color="#000"
                          stroke={2}
                        />
                      </div>
                    </Link>
                  </div>
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
              <Link to={`/recipes/edit/${recipeId}/directions`}>edit</Link>
            </Section>
            <Section>
              <TextButton
                label="Delete"
                color="#d35400"
                handleClick={handleDelete}
              />
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

  .helper {
    font-size: ${typeScale.helper};
    font-weight: 500;
    letter-spacing: 0.03rem;
    color: ${neutral[400]};
  }

  .sbody {
    font-size: ${typeScale.sbody};
    color: ${neutral[500]};
    letter-spacing: 0.025rem;
    margin-bottom: ${spacing.xxs};
  }

  .vspace {
    margin-bottom: ${spacing.xxxs};
  }
`;

const Header = styled.header`
  text-align: center;
  padding: ${spacing.xl};

  .category {
    text-transform: uppercase;
  }

  .title {
    font-family: ${tertiaryFont};
    color: ${neutral[700]};
    margin: ${spacing.xxs} 0;
  }
`;

const Section = styled.section`
  width: 100%;
  padding: ${spacing.xl} 0;

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

  .serving {
    display: flex;
    justify-content: center;
    background-color: ${neutral[10]};
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${spacing.xxl};
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

const Element = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const Article = styled.article`
  padding: ${spacing.l} 0;

  h5 {
    font-family: ${tertiaryFont};
    font-weight: 600;
    color: ${neutral[600]};
  }

  .txtBtn {
    font-size: ${typeScale.helper};
    cursor: pointer;
  }

  .react-responsive-modal-modal {
    width: 100%;
    height: 100%;
  }

  .flex {
    display: flex;
    align-items: center;
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

export default connect(mapStateToProps, { addDirections, deleteRecipe })(
  RecipeDetail
);
