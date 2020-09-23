import React from "react";
import { StyleRoot } from "radium";
import { style } from "./style";
import Navbar from "./Navbar";
import Box from "./Box";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Article from "./Article";
import RedirectNotice from "./RedirectNotice";
import Cockpit from "./cockpit";
import ScrollToTop from "./ScrollTop";
import ChurchArticle from "./ChurchArticle";
import Wochenblatt from "./Wochenblatt";
import LandingPage from "./LandingPage";
import LiturgyLive from "./LiturgyLive";
import Resources from "./Resources";

function App() {
  return (
    <StyleRoot>
      <div
        style={{
          ...style.responsive,
          background: style.light,
          minHeight: "calc(100vh - 120px)",
          paddingTop: 20,
          paddingBottom: 60,
        }}
      >
        <Router>
          <ScrollToTop />
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/impressum">
              <Box>
                <Article
                  article={() => Cockpit.singleton("impressum")}
                ></Article>
              </Box>
            </Route>
            <Route exact path="/emmaus">
              <ChurchArticle
                entry={() =>
                  Cockpit.collectionEntry(
                    "churches",
                    "5f18288a6536666d1f000260"
                  )
                }
              ></ChurchArticle>
            </Route>
            <Route exact path="/neustift">
              <ChurchArticle
                entry={() =>
                  Cockpit.collectionEntry(
                    "churches",
                    "5f1aa08f633830e8aa000125"
                  )
                }
              ></ChurchArticle>
            </Route>
            <Route exact path="/nikolaus">
              <ChurchArticle
                entry={() =>
                  Cockpit.collectionEntry(
                    "churches",
                    "5f1aa1b3393061b0880001a6"
                  )
                }
              ></ChurchArticle>
            </Route>
            <Route exact path="/redirect-notice">
              <RedirectNotice></RedirectNotice>
            </Route>
            <Route exact path="/resources">
              <Resources />
            </Route>
            <Route exact path="/wochenblatt">
              <Wochenblatt />
            </Route>
            <Route exact path="/liturgy-live">
              <LiturgyLive />
            </Route>
            <Route path="*">
              <b>404</b> Seite nicht gefunden
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </div>
    </StyleRoot>
  );
}

export default App;
