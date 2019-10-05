import { Divider, Grid, Typography } from "@material-ui/core";
import { DocumentNode } from "graphql";
import React, { ReactNode } from "react";
import { Query } from "react-apollo";
import { PagedView } from "../../component/story/PagedView";
import { StoryListLink } from "../../component/story/StoryListLink";
import { StoriesResult, Story } from "../../graphql/types";

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
        <Grid item key={story._id}>
          <StoryListLink
            to={`/story/${story._id}`}
            title={story.title}
            description={story.description}
          />
          <Divider variant="middle" />
        </Grid>
      ))}
    </Grid>
  )

  render() {
    const { page } = this.state;
    return (
      <Query<{ stories: StoriesResult }> query={this.props.query} variables={{ page: page + 1, ...this.props.args }}>
        {({ loading, data, error }) => {
          if (loading) { return <Typography>Loading...</Typography>; }
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          const { pageCount, stories } = data.stories;
          return (
            <PagedView
              pages={{
                count: pageCount,
                current: stories,
                currentIndex: this.state.page,
                onPageChange: newPage => this.setState({ page: newPage })
              }}
              renderPage={this.renderPage}
            />
          );
        }}
      </Query>
    );
  }
}
