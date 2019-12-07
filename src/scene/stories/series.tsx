import React from "react";
import { RouteComponentProps } from "react-router";
import { StoryList } from "../../component/stories/StoryList";
import { STORIES_BY_SERIES } from "../../graphql/stories";
import { QueryStoriesBySeriesArgs  } from "../../graphql/types";

type StorySeriesSceneProps = RouteComponentProps<{
  seriesId: string;
}>;

export const StorySeriesScene: React.FC<StorySeriesSceneProps> = ({ match: { params: { seriesId } } }) => (
  <StoryList<QueryStoriesBySeriesArgs>
    query={STORIES_BY_SERIES}
    args={{ seriesId: Number(seriesId) }}
  />
);
