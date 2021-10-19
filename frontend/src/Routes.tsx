import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import template
import Design from "./pages/Design";

//import pages
import Home from "./pages/Home";
import New from "./pages/recipes/New";
import NewServing from "./pages/recipes/NewServingSize";
import NewIngredients from "./pages/recipes/NewIngredients";
import NewDirections from "./pages/recipes/NewDirections";
import Recipes from "./pages/recipes/Recipes";
import RecipeDetail from "./pages/recipes/RecipeDetail";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/design" component={Design} />
          <Route exact path="/recipes/" component={Recipes} />
          <Route exact path="/recipes/add" component={New} />
          <Route
            exact
            path="/recipes/:recipeId/serving"
            component={NewServing}
          />
          <Route
            exact
            path="/recipes/:recipeId/ingredients"
            component={NewIngredients}
          />
          <Route
            exact
            path="/recipes/:recipeId/directions"
            component={NewDirections}
          />
          <Route exact path="/recipe/:recipeId" component={RecipeDetail} />
          {/* edit */}
          <Route exact path="/recipe/edit/:recipeId/info" component={New} />
          <Route
            exact
            path="/recipe/edit/:recipeId/details"
            component={NewServing}
          />
          <Route
            exact
            path="/recipe/edit/:recipeId/ingredients"
            component={NewIngredients}
          />
          <Route
            exact
            path="/recipe/edit/:recipeId/directions"
            component={NewDirections}
          />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
