import React, { useState, useEffect } from "react";
import Select from "react-select";
import _ from "lodash";

//import layout components
import { Wrapper } from "../../components/layout/Wrapper";
import { Section } from "../../components/layout/Containers";
import { Card, SimpleCard } from "../../components/Cards";

//import components;

//import token
import { primaryColor, spacing, neutral } from "../../components/token";

//import assets
import { Whisk } from "../../assets/Icons";

//local data
import { categoryOptions } from "../../data/recipeData";

//redux
import { connect } from "react-redux";
import { addDirections } from "../../reducers/recipeReducer";

const Recipes = (props) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const sortData = () => {
      let recipeList = props.recipes;
      let orderedList = _.orderBy(recipeList, ["id"], ["desc"]);
      setRecipes(orderedList);
    };

    sortData();
  }, [props.recipes]);

  const getThumbnail = (url) => {
    let id = url.split("/");
    let address = id[id.length - 1];
    address = `http://img.youtube.com/vi/${address}/0.jpg`;
    return address;
  };

  const [filtered, setFiltered] = useState([]);

  const handleSelect = (e) => {
    //get selected value
    let selected = e.value;

    let newRecipes = [...recipes];
    let filter = newRecipes.filter((item) => item.category.value === selected);

    setFiltered(filter);
  };

  return (
    <Wrapper>
      <Section>
        <SimpleCard
          background={primaryColor.lightyellow}
          padding={`${spacing.xxs} ${spacing.m}`}
          margin={`0 0 ${spacing.xs} 0`}
          title="Add a new recipe"
          subtitle="hello add this recipe"
          icon={<Whisk width={30} height={40} fill={neutral[600]} />}
          url={`/recipes/add`}
        ></SimpleCard>
      </Section>
      <Section>
        <Select
          options={
            categoryOptions &&
            categoryOptions.map((item) => ({
              label: item.name,
              value: item.value,
              id: item.id,
            }))
          }
          placeholder="Category"
          onChange={(e) => {
            handleSelect(e);
          }}
        />
      </Section>
      <Section>
        {filtered && filtered.length > 0
          ? filtered.map((item, idx) => (
              <Card
                key={idx}
                img={getThumbnail(item.youtube)}
                title={item.name}
                subtitle={item.category.name}
                url={`/recipe/${item.id}`}
                padding={`${spacing.xs} 0`}
              />
            ))
          : recipes.map((item, idx) => (
              <Card
                key={idx}
                img={getThumbnail(item.youtube)}
                title={item.name}
                subtitle={item.category.name}
                url={`/recipe/${item.id}`}
                padding={`${spacing.xs} 0`}
              />
            ))}
      </Section>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addDirections })(Recipes);
