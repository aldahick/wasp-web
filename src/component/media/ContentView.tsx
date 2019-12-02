import { createStyles, Typography, withStyles, WithStyles } from "@material-ui/core";
import axios from "axios";
import * as mime from "mime";
import React, { VideoHTMLAttributes } from "react";
import { isIOS } from "react-device-detect";
import { Config } from "../../Config";
import { UserState } from "../auth";

const styles = createStyles({
  textContent: {
    whiteSpace: "pre-wrap"
  }
});

type ContentViewProps = {
  targetKey: string;
  onClick?: () => void;
} & WithStyles<typeof styles>;

interface ContentViewState {
  data?: string;
  errorMessage?: string;
}

const TEXT_MIME_TYPES = ["text/html", "text/plain"];

export const ContentView = withStyles(styles)(class extends React.Component<ContentViewProps, ContentViewState> {
  readonly state: ContentViewState = {};

  contentUrl(key: string) {
    return Config.apiUrl + "/media/content?token=" + encodeURIComponent(UserState.token || "") + "&key=" + encodeURIComponent(key);
  }

  mimeType(key: string) {
    return mime.getType(key) || "text/plain";
  }

  isText(key: string) {
    return TEXT_MIME_TYPES.includes(this.mimeType(key));
  }

  async componentWillReceiveProps({ targetKey }: ContentViewProps) {
    if (!this.isText(targetKey)) {
      return;
    }
    try {
      this.setState({
        data: await axios.get(this.contentUrl(targetKey)).then(r => r.data),
        errorMessage: undefined
      });
    } catch (err) {
      console.error(err);
      this.setState({ errorMessage: err.message });
    }
  }

  async componentDidMount() {
    return this.componentWillReceiveProps(this.props);
  }

  render() {
    const { classes, onClick, targetKey } = this.props;
    if (this.state.errorMessage) {
      return <Typography onClick={onClick} color="error">{this.state.errorMessage}</Typography>;
    }
    switch (this.mimeType(targetKey)) {
      case "video/quicktime":
      case "video/mp4":
        const videoProps: Partial<VideoHTMLAttributes<HTMLVideoElement>> = { playsInline: true };
        if (isIOS) {
          videoProps.muted = true;
        }
        return <video onClick={onClick} style={{ width: "100%" }} controls autoPlay src={this.contentUrl(targetKey)} {...videoProps} />;
      case "audio/mp4":
      case "audio/mp3":
      case "audio/mpeg":
        return <audio onClick={onClick} controls autoPlay src={this.contentUrl(targetKey)} />;
      case "image/jpg":
      case "image/jpeg":
      case "image/png":
        return <img onClick={onClick} alt={this.props.targetKey} src={this.contentUrl(targetKey)} />;
      case "text/html":
        return <div onClick={onClick} dangerouslySetInnerHTML={{ __html: this.state.data || "No HTML" }} />;
      case "text/plain":
        return <div onClick={onClick} className={classes.textContent}>{this.state.data}</div>;
    }
    return <Typography onClick={onClick} color="error">Invalid MIME type {this.mimeType}.</Typography>;
  }
});
