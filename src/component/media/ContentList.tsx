import { Button, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import React from "react";
import { Query } from "react-apollo";
import { LIST_MEDIA, ListMediaResult } from "../../graphql/listMedia";
import { MediaItemType, QueryListMediaArgs } from "../../graphql/types";
import { ContentSeries } from "./ContentSeries";
import { ContentView } from "./ContentView";

interface ContentListState {
  rows: {
    selected?: string;
    options: {
      key: string;
      type: MediaItemType;
    }[];
  }[];
}

export class ContentList extends React.Component<{}, ContentListState> {
  readonly state: ContentListState = {
    rows: []
  };

  get selectedKey() {
    return this.state.rows.map(r => r.selected).join("/");
  }

  get selectedType() {
    const lastRow = this.state.rows.slice(-1)[0];
    if (!lastRow) { return undefined; }
    const selected = lastRow.selected;
    if (!selected) { return undefined; }
    return lastRow.options.find(o => o.key === selected)!.type;
  }

  onListSubmit = (index: number) => () => {
    this.state.rows.splice(index + 1, this.state.rows.length + 1 - index);
    this.setState({ rows: this.state.rows });
  }

  onSelectChange = (index: number) => (evt: React.ChangeEvent<{ name?: string; value: unknown }>, child: any) => {
    const { rows } = this.state;
    rows[index].selected = evt.target.value as string;
    this.setState({ rows: rows.splice(0, index + 1) });
  }

  render() {
    const selectedType = this.selectedType;
    if (selectedType && selectedType !== MediaItemType.Directory) {
      return (
        <Grid container>
          {this.renderSelect()}
          {selectedType === MediaItemType.Series
            ? <ContentSeries dir={this.selectedKey} />
            : <ContentView targetKey={this.selectedKey} />
          }
        </Grid>
      );
    }
    return (
      <Query<ListMediaResult, QueryListMediaArgs> query={LIST_MEDIA} variables={{ dir: this.selectedKey }}>
        {({ data, loading, error }) => {
          if (loading) { return <Typography>Loading...</Typography>; }
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          this.state.rows.push({
            options: data.listMedia,
            selected: (data.listMedia[0] || {}).key
          });
          return (
            <Grid container>
              {}
              {this.renderSelect()}
            </Grid>
          );
        }}
      </Query>
    );
  }

  private renderSelect() {
    const { rows } = this.state;
    return (
      <Grid container>
        {rows.map((row, index) => (
          <Grid container justify="center" key={index}>
            <Grid item xs={10} sm={8} md={6}>
              <Select style={{ width: "100%" }} value={row.selected} onChange={this.onSelectChange(index)}>
                {row.options.map(({ key, type }) => (
                  <MenuItem key={key} value={key} data-isfile={type === MediaItemType.File}>
                    <Typography>{key}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={this.onListSubmit(index)}>
                <Typography>List</Typography>
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }
}
