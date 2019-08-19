import * as _ from "lodash";
import React, { ReactNode } from "react";
import { Query } from "react-apollo";
import { StoryBodyResult, STORY_BODY, StoryBodyParams } from "../graphql/stories";
import { Typography } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { Story } from "../graphql/types";
import { PagedView } from "../component/story/PagedView";

type StoryProps = {
  story: Story;
} & RouteComponentProps<{
  categoryId: string;
  storyId: string;
}>;

export class StoryScene extends React.Component<StoryProps> {
  private renderPage(lines: string[]): ReactNode {
    return (
      <Typography dangerouslySetInnerHTML={{ __html: lines.join("<br />") }} />
    );
  }

  render() {
    const storyId = Number(this.props.match.params.storyId);
    return (
      <Query<StoryBodyResult, StoryBodyParams> query={STORY_BODY} variables={{ storyId }}>
        {({ loading, data, error }) => {
          if (loading) return null;
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          const { body } = data.story;
          return (
            <PagedView
              pages={_.chunk(body.split("<br />"), 10)}
              renderPage={this.renderPage}
            />
          );
        }}
      </Query>
    );
  }
}
