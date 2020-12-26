import React from "react";
import { style } from "./util/style";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollTop";
import Wochenblatt from "./pages/Wochenblatt";
import LiturgyLive from "./components/LiturgyLive";
import Resources from "./pages/Resources";
import Radium from "radium";
import LandingPage from "./pages/LandingPage/LandingPage";
import Impressum from "./pages/Impressum";
import RedirectNotice from "./pages/RedirectNotice";
import Login from "./pages/Login";
import Scheduler from "./pages/Scheduler";
import { Provider } from "react-redux";
import { store } from "./store/store";
import NewsletterAdministration from "./pages/NewsletterAdministration";
import LivestreamAutocontrol from "./pages/LivestreamAutocontrol";
import ArticlePage from "./components/ArticlePage";

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
        <Provider store={store}>
          <Router>
            <ScrollToTop />
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/impressum" component={Impressum} />
              <Route exact path="/redirect-notice" component={RedirectNotice} />
              <Route exact path="/resources" component={Resources} />
              <Route exact path="/wochenblatt" component={Wochenblatt} />
              <Route exact path="/einteilung" component={Scheduler} />
              <Route exact path="/liturgy-live" component={LiturgyLive} />
              <Route
                exact
                path="/beitrag/:slug"
                render={({ match }) => <ArticlePage slug={match.params.slug} />}
              />
              <Route
                exact
                path="/autocontrol"
                component={LivestreamAutocontrol}
              />
              <Route
                exact
                path="/newsletter-administration"
                component={NewsletterAdministration}
              />
              <Route exact path="/login" component={Login} />
              <Route path="*">
                <b>404</b> Seite nicht gefunden
              </Route>
            </Switch>
            <Footer></Footer>
          </Router>
        </Provider>
      </div>
    </Radium.StyleRoot>
  );
}

export default App;
