import React from "react";
import { StoryList } from "../component/story/StoryList";

export class StoryFavoritesScene extends React.Component {
  render() {
    return <StoryList args={{ favorites: true }} />;
  }
}
