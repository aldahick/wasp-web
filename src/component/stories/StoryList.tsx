import { Divider, Grid } from "@material-ui/core";
import { DocumentNode } from "graphql";
import React, { ReactNode } from "react";
import { Query } from "react-apollo";
import { PagedView } from "../../component/stories/PagedView";
import { StoryListLink } from "../../component/stories/StoryListLink";
import { StoriesResult, Story } from "../../graphql/types";
import { checkQueryResult } from "../../util/graphql";

interface StoryCategoryProps<Params> {
  args: Omit<Params, "page">;
  query: DocumentNode;
}

interface StoryCategoryState {
  page: number;
}

export class StoryList<Params extends {}> extends React.Component<StoryCategoryProps<Params>, StoryCategoryState> {
  readonly state: StoryCategoryState = {
    page: 0
  };

  private renderPage = (stories: Story[]): ReactNode => (
    <Grid container direction="column">
      {stories.map(story => (
        <Grid item key={story.id}>
          <StoryListLink
            to={`/stories/${story.id}`}
            title={story.title}
            description={story.description}
          />
          <Divider variant="middle" />
        </Grid>
      ))}
    </Grid>
  );

  render() {
    const { page } = this.state;
    return (
      <Query<{ stories: StoriesResult }> query={this.props.query} variables={{ page: page + 1, ...this.props.args }}>
        {checkQueryResult<{ stories: StoriesResult }>(({ stories: { pageCount, stories } }) => (
          <PagedView
            pages={{
              count: pageCount,
              current: stories,
              currentIndex: this.state.page,
              onPageChange: newPage => this.setState({ page: newPage })
            }}
            renderPage={this.renderPage}
          />
        ))}
      </Query>
    );
  }
}
