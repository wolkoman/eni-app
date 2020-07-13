import React from 'react';
import {StyleRoot} from 'radium';
import {style} from './style';
import Navbar from './Navbar';
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
          <Navbar></Navbar>
          <Switch>
            <Route exact path="/">
              <Box label="Pfarren" styled={false}>
                <Churches></Churches>
              </Box>
              <Box label="Termine">
                <Events></Events>
              </Box>
            </Route>
            <Route exact path="/impressum">
              <Box>
                <Article id="6W7G98iDMKpOdJJ1LlikCQ"></Article>
              </Box>
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
