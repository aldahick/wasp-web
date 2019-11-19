import React from "react";
import { RouteComponentProps } from "react-router";
import { StoryList } from "../../component/stories/StoryList";
import { STORIES_BY_CATEGORY } from "../../graphql/stories";

type StoryCategoryProps = RouteComponentProps<{
  categoryId: string;
}>;

export class StoryCategoryScene extends React.Component<StoryCategoryProps> {
  private get categoryId() {
    return Number(this.props.match.params.categoryId);
  }

  render() {
    sessionStorage.setItem("lastStoryCategoryId", this.categoryId.toString());
    return <StoryList query={STORIES_BY_CATEGORY} args={{ categoryId: this.categoryId }} />;
  }
}
