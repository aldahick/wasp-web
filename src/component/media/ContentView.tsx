import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import axios from "axios";
import * as mime from "mime";
import { isIOS } from "react-device-detect";
import React, { VideoHTMLAttributes } from "react";
import { Config } from "../../Config";
import { UserState } from "../auth";

const styles = createStyles({

});

type ContentViewProps = {
  targetKey: string;
} & WithStyles<typeof styles>;

interface ContentViewState {
  data?: string;
  errorMessage?: string;
}

const TEXT_MIME_TYPES = ["text/html", "text/plain"];

export const ContentView = withStyles(styles)(class extends React.Component<ContentViewProps, ContentViewState> {
  readonly state: ContentViewState = {};

  get contentUrl() {
    return Config.apiUrl + "/media/content?token=" + encodeURIComponent(UserState.token || "") + "&key=" + encodeURIComponent(this.props.targetKey);
  }

  get mimeType() {
    return mime.getType(this.props.targetKey) || "text/plain";
  }

  get isText() {
    return TEXT_MIME_TYPES.includes(this.mimeType);
  }

  async componentDidMount() {
    if (!this.isText) {
      return;
    }
    try {
      this.setState({
        data: await axios.get(this.contentUrl).then(r => r.data),
        errorMessage: undefined
      });
    } catch (err) {
      console.error(err);
      this.setState({ errorMessage: err.message });
    }
  }

  render() {
    if (this.state.errorMessage) {
      return <Typography color="error">{this.state.errorMessage}</Typography>;
    }
    switch (this.mimeType) {
      case "video/quicktime":
      case "video/mp4":
        const videoProps: Partial<VideoHTMLAttributes<HTMLVideoElement>> = { playsInline: true };
        if (isIOS) {
          videoProps.muted = true;
        }
        return <video style={{ width: "100%" }} controls autoPlay src={this.contentUrl} {...videoProps} />;
      case "audio/mp3":
      case "audio/mpeg":
        return <audio controls autoPlay src={this.contentUrl} />;
      case "image/png":
        return <img src={this.contentUrl} />;
      case "text/html":
        return <div dangerouslySetInnerHTML={{ __html: this.state.data || "No HTML" }} />;
      case "text/plain":
        return <pre>{this.state.data}</pre>;
    }
    if (this.isText) {
      if (!this.state.data) {
        return <Typography>Loading...</Typography>;
      }
      return <pre>{this.state.data}</pre>;
    }
    return <Typography color="error">Invalid MIME type {this.mimeType}.</Typography>;
  }
});
