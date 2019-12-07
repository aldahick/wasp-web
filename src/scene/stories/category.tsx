import React from "react";
import { RouteComponentProps } from "react-router";
import { StoryList } from "../../component/stories/StoryList";
import { STORIES_BY_CATEGORY } from "../../graphql/stories";
import { QueryStoriesByCategoryArgs } from "../../graphql/types";

type StoryCategorySceneProps = RouteComponentProps<{
  categoryId: string;
}>;

export const StoryCategoryScene: React.FC<StoryCategorySceneProps> = ({ match: { params: { categoryId } } }) => (
  <StoryList<QueryStoriesByCategoryArgs>
    query={STORIES_BY_CATEGORY}
    args={{ categoryId: Number(categoryId) }}
  />
);
