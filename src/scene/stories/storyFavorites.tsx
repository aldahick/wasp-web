import React from "react";
import { StoryList } from "../../component/story/StoryList";
import { FAVORITE_STORIES } from "../../graphql/stories";

export class StoryFavoritesScene extends React.Component {
  render() {
    return <StoryList query={FAVORITE_STORIES} args={{}} />;
  }
}
