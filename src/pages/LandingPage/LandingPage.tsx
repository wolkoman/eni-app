import React from "react";
import Announcement from "../../components/Announcement";
import VaticanNews from "../../components/VaticanNews";
import Churches from "../../components/Churches";
import Events from "./Events/Events";
import Instagram from "../../components/Instagram";
import Livestreams from "./Livestreams/Livestreams";
import Title from "./Title";
import InformationPanel from "../../components/InformationPanel";

export default () => (
  <div>
    <Title></Title>
    <Livestreams />
    <Churches />
    <Events />
    <Announcement />
    <Instagram />
    <VaticanNews />
    <InformationPanel />
  </div>
);
