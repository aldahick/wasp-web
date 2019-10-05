import { Button, Grid } from "@material-ui/core";
import * as _ from "lodash";
import React, { ReactNode } from "react";

interface PagedViewProps<PageData> {
  pages: PageData[] | {
    count: number;
    current: PageData;
    currentIndex: number;
    onPageChange(newPage: number): void;
  };
  renderPage(page: PageData): ReactNode;
}

interface PagedViewState {
  /**
   * 0-index
   */
  pageIndex: number;
}

export class PagedView<PageData> extends React.Component<PagedViewProps<PageData>, PagedViewState> {
  readonly state: PagedViewState = {
    pageIndex: this.props.pages instanceof Array ? 0 : this.props.pages.currentIndex
  };

  private get currentPage() {
    const { pages } = this.props;
    return pages instanceof Array ? pages[this.state.pageIndex] : pages.current;
  }

  private get pageCount() {
    const { pages } = this.props;
    return pages instanceof Array ? pages.length : pages.count;
  }

  private onPageChange(change: number) {
    return () => {
      const { pages } = this.props;
      const pageIndex = _.clamp(this.state.pageIndex + change, 0, this.pageCount);
      this.setState({ pageIndex }, () => {
        window.scrollTo(0, 0);
        if (!(pages instanceof Array)) {
          pages.onPageChange(pageIndex);
        }
      });
    };
  }

  render() {
    const { pageIndex } = this.state;
    const { renderPage } = this.props;
    return (
      <Grid container direction="column" alignItems="center">
        <Grid container justify="center">
          <Button onClick={this.onPageChange(-1)}>Previous</Button>
          <Button disabled>{pageIndex + 1} / {this.pageCount}</Button>
          <Button onClick={this.onPageChange(1)}>Next</Button>
        </Grid>
        <Grid item>
          {renderPage(this.currentPage)}
        </Grid>
        <Grid container justify="center">
          <Button onClick={this.onPageChange(-1)}>Previous</Button>
          <Button disabled>{pageIndex + 1} / {this.pageCount}</Button>
          <Button onClick={this.onPageChange(1)}>Next</Button>
        </Grid>
      </Grid>
    );
  }
}
