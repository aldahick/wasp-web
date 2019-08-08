import { ExpansionPanel, ExpansionPanelSummary, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { ContentList } from "../component/media/ContentList";

interface MediaSceneState {
  isExpanded: { [key in "content" | "upload"]: boolean };
}

export class MediaScene extends React.Component<{}, MediaSceneState> {
  readonly state: MediaSceneState = {
    isExpanded: {
      content: true,
      upload: false
    }
  };

  toggleExpansion = (key: keyof MediaSceneState["isExpanded"]) => () => {
    this.setState({
      isExpanded: {
        ...this.state.isExpanded,
        [key]: !this.state.isExpanded[key]
      }
    });
  };

  render() {
    return (
      <Fragment>
        <ExpansionPanel expanded={this.state.isExpanded.upload}>
          <ExpansionPanelSummary onClick={this.toggleExpansion("upload")}>
            <Typography variant="subtitle1">Upload</Typography>
          </ExpansionPanelSummary>
        </ExpansionPanel>
        <div style={{ paddingTop: "1em" }}>
          <ContentList dir="" />
        </div>
      </Fragment>
    );
  }
}
