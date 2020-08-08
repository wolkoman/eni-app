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
import ChurchArticle from './ChurchArticle';
import ArticleSnippets from './ArticleSnippet';
import { Livestream } from './Livestream';

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
              <Livestream></Livestream>
              <Box label="Pfarren" styled={false}>
                <Churches></Churches>
              </Box>
              <Box label="Termine">
                <Events></Events>
              </Box>
              <Box label="Vatikan Nachrichten" styled={false}>
                <ArticleSnippets></ArticleSnippets>
              </Box>
            </Route>
            <Route exact path="/impressum">
              <Box><Article article={() => Cockpit.singleton('impressum')}></Article></Box>
            </Route>
            <Route exact path="/emmaus">
              <ChurchArticle entry={() => Cockpit.collectionEntry('churches','5f18288a6536666d1f000260')}></ChurchArticle>
            </Route>
            <Route exact path="/neustift">
              <ChurchArticle entry={() => Cockpit.collectionEntry('churches','5f1aa08f633830e8aa000125')}></ChurchArticle>
            </Route>
            <Route exact path="/inzersdorf">
              <ChurchArticle entry={() => Cockpit.collectionEntry('churches','5f1aa1b3393061b0880001a6')}></ChurchArticle>
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
