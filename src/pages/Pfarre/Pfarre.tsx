import React from "react";
import { Route, Switch } from "react-router-dom";
import PfarreArticle from "./PfarreArticle";
import Cockpit from "../../cockpit";

export default () => (
  <div>
    <Switch>
      <Route path="/pfarre/emmaus">
        <PfarreArticle
          entry={() =>
            Cockpit.collectionEntry("churches", "5f18288a6536666d1f000260")
          }
        ></PfarreArticle>
      </Route>
      <Route exact path="/pfarre/neustift">
        <PfarreArticle
          entry={() =>
            Cockpit.collectionEntry("churches", "5f1aa08f633830e8aa000125")
          }
        ></PfarreArticle>
      </Route>
      <Route exact path="/pfarre/nikolaus">
        <PfarreArticle
          entry={() =>
            Cockpit.collectionEntry("churches", "5f1aa1b3393061b0880001a6")
          }
        ></PfarreArticle>
      </Route>
      <Route path="*">
        <b>404</b> Seite nicht gefunden
      </Route>
    </Switch>
  </div>
);
