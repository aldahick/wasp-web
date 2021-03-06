import { Divider, Grid } from "@material-ui/core";
import * as _ from "lodash";
import React, { ReactNode } from "react";
import { Query } from "react-apollo";
import { PagedView } from "../../component/stories/PagedView";
import { StoryListLink } from "../../component/stories/StoryListLink";
import { STORY_CATEGORIES, StoryCategoriesResult } from "../../graphql/stories";
import { StoryCategory } from "../../graphql/types";
import { checkQueryResult } from "../../util/graphql";

export class StoryCategoriesScene extends React.Component<{}> {
  private renderPage(categories: StoryCategory[]): ReactNode {
    return categories.map(category => (
      <Grid item key={category.id}>
        <StoryListLink
          title={category.name}
          description={category.description}
          to={`/stories/category/${category.id}`}
        />
        <Divider variant="middle" />
      </Grid>
    ));
  }

  render() {
    return (
      <Query<StoryCategoriesResult> query={STORY_CATEGORIES}>
        {checkQueryResult<StoryCategoriesResult>(({ categories }) => (
          <PagedView
            pages={_.chunk(categories, 10)}
            renderPage={this.renderPage}
          />
        ))}
      </Query>
    );
  }
}
