import React, { Fragment } from "react";
import { ContentActions } from "../component/media/ContentActions";
import { ContentList } from "../component/media/ContentList";

export class MediaScene extends React.Component {
  render() {
    return (
      <Fragment>
        <ContentActions />
        <ContentList />
      </Fragment>
    );
  }
}
