import React from "react";
import { RouteComponentProps } from "react-router";
import { StoryList } from "../component/story/StoryList";

type StoryCategoryProps = RouteComponentProps<{
  categoryId: string;
}>;

export class StoryCategoryScene extends React.Component<StoryCategoryProps> {
  private get categoryId() {
    return Number(this.props.match.params.categoryId);
  }

  render() {
    return <StoryList args={{ categoryId: this.categoryId }} />;
  }
}
