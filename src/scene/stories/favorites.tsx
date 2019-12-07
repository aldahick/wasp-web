import React from "react";
import { StoryList } from "../../component/stories/StoryList";
import { FAVORITE_STORIES } from "../../graphql/stories";
import { QueryFavoriteStoriesArgs } from "../../graphql/types";

export class StoryFavoritesScene extends React.Component {
  render() {
    return <StoryList<QueryFavoriteStoriesArgs>
      query={FAVORITE_STORIES}
      args={{}}
    />;
  }
}
