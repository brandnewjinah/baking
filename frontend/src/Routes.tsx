import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import components
import Layout from "./components/Layout";

//import pages
import Home from "./pages/Home";
import New from "./pages/recipes/New";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/recipes/add" component={New} />
        </Layout>
      </Switch>
    </Router>
  );
};

export default Routes;
