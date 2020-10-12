import React from "react";
import { style } from "./util/style";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./ScrollTop";
import Wochenblatt from "./pages/Wochenblatt";
import LiturgyLive from "./pages/LiturgyLive";
import Resources from "./pages/Resources";
import Radium from "radium";
import LandingPage from "./pages/LandingPage/LandingPage";
import Pfarre from "./pages/Pfarre/Pfarre";
import Impressum from "./pages/Impressum";
import RedirectNotice from "./pages/RedirectNotice";

function App() {
  return (
    <Radium.StyleRoot>
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
            <Route exact path="/" component={LandingPage} />
            <Route path="/pfarre" component={Pfarre} />
            <Route exact path="/impressum" component={Impressum} />
            <Route exact path="/redirect-notice" component={RedirectNotice} />
            <Route exact path="/resources" component={Resources} />
            <Route exact path="/wochenblatt" component={Wochenblatt} />
            <Route exact path="/liturgy-live" component={LiturgyLive} />
            <Route path="*">
              <b>404</b> Seite nicht gefunden
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </div>
    </Radium.StyleRoot>
  );
}

export default App;
