import React from 'react';
import {StyleRoot} from 'radium';
import {style} from './style';
import Navbar from './Navbar';
import Title from './Title';
import Churches from './Churches';
import Box from './Box';
import Events from './Events';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Article from './Article';
import RedirectNotice from './RedirectNotice';
import Cockpit from './cockpit';
import ScrollToTop from './ScrollTop';

function App() {
  return (
    <StyleRoot>
      <div style={{
        ...style.responsive,
        background: style.light,
        minHeight: 'calc(100vh - 120px)',
        paddingTop: 20,
        paddingBottom: 60
        }}>
        <Router>
          <ScrollToTop/>
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/">
              <Title></Title>
              <Box label="Pfarren" styled={false}>
                <Churches></Churches>
              </Box>
              <Box label="Termine">
                <Events></Events>
              </Box>
            </Route>
            <Route exact path="/impressum">
              <Box><Article article={() => Cockpit.singleton('impressum')}></Article></Box>
            </Route>
            <Route exact path="/emmaus">
              <Box><Article article={() => Cockpit.singleton('emmaus')}></Article></Box>
            </Route>
            <Route exact path="/neustift">
              <Box><Article article={() => Cockpit.singleton('inzersdorf_neustift')}></Article></Box>
            </Route>
            <Route exact path="/inzersdorf">
              <Box><Article article={() => Cockpit.singleton('inzersdorf')}></Article></Box>
            </Route>
            <Route exact path="/redirect-notice">
              <RedirectNotice></RedirectNotice>
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
