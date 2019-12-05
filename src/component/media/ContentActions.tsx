import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Mutation, MutationFunction } from "react-apollo";
import { SCRAPE_MEDIA, ScrapeMediaResult } from "../../graphql/media";
import { MutationScrapeMediaArgs } from "../../graphql/types";
import { callMutationSafe } from "../../util/graphql";
import { Form } from "../Form";

interface ContentActionsState {
  isExpanded: boolean;
  successMessage?: string;
  errorMessage?: string;
}

export class ContentActions extends React.Component<{}, ContentActionsState> {
  readonly state: ContentActionsState = {
    isExpanded: false,
    successMessage: undefined,
    errorMessage: undefined
  };

  onSubmit(scrapeMedia: MutationFunction<ScrapeMediaResult, MutationScrapeMediaArgs>) {
    return async (fields: MutationScrapeMediaArgs) => {
      try {
        await callMutationSafe(scrapeMedia, fields);
        this.setState({
          successMessage: `Successfully scraped to ${fields.destination}`
        });
      } catch (err) {
        console.error(err);
        this.setState({
          errorMessage: err.message
        });
      }
    };
  }

  render() {
    const { isExpanded, successMessage, errorMessage } = this.state;
    return (
      <ExpansionPanel expanded={this.state.isExpanded}>
        <ExpansionPanelSummary onClick={() => this.setState({ isExpanded: !isExpanded})}>
          <Typography variant="subtitle1">Scrape</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container direction="column">
            <Mutation<ScrapeMediaResult, MutationScrapeMediaArgs> mutation={SCRAPE_MEDIA}>
              {scrapeMedia => (
                <Form
                  fields={{
                    url: {
                      placeholder: "URL",
                      isRequired: true
                    },
                    destination: {
                      placeholder: "Destination",
                      isRequired: true
                    }
                  }}
                  onSubmit={this.onSubmit(scrapeMedia)}
                  successMessage={successMessage}
                  errorMessage={errorMessage}
                />
              )}
            </Mutation>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
