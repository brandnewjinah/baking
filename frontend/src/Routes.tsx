import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import pages
import Home from "./pages/Home";
import New from "./pages/recipes/New";
import NewIngredients from "./pages/recipes/NewIngredients";
import NewDirections from "./pages/recipes/NewDirections";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes/add" component={New} />
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
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
