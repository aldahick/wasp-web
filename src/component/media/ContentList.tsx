import React from "react";
import { Query } from "react-apollo";
import { ListMediaResult, LIST_MEDIA } from "../../graphql/listMedia";
import { QueryListMediaArgs } from "../../graphql/types";
import { Grid, Typography, Select, MenuItem, Button } from "@material-ui/core";
import { ContentView } from "./ContentView";

interface ContentListProps {
  dir: string;
}

interface ContentListState {
  isFileSelected: boolean;
  rows: {
    selected: string | undefined;
    options: {
      key: string;
      isFile: boolean;
    }[];
  }[];
}

export class ContentList extends React.Component<ContentListProps, ContentListState> {
  readonly state: ContentListState = {
    isFileSelected: false,
    rows: []
  };

  get selectedKey() {
    const { rows: selected } = this.state;
    return selected.map(r => r.selected).join("/");
  }

  onListSubmit = (index: number) => () => {
    this.state.rows.splice(index + 1, this.state.rows.length + 1 - index);
    this.setState({ rows: this.state.rows });
  };

  onSelectChange = (index: number) => (evt: React.ChangeEvent<{ name?: string; value: unknown }>, child: any) => {
    const { rows } = this.state;
    rows[index].selected = evt.target.value as string;
    this.setState({ rows: rows.splice(0, index + 1), isFileSelected: child.props["data-isfile"] });
  };

  render() {
    const { isFileSelected } = this.state;
    if (isFileSelected) {
      return (
        <Grid container>
          {this.renderSelect()}
          <ContentView targetKey={this.selectedKey} />
        </Grid>
      );
    }
    return (
      <Query<ListMediaResult, QueryListMediaArgs> query={LIST_MEDIA} variables={{ dir: this.selectedKey }}>
        {({ data, loading, error }) => {
          if (loading) return null;
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          this.state.rows.push({
            options: data.listMedia,
            selected: data.listMedia[0].key
          });
          return (
            <Grid container>
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
                {row.options.map(({ key, isFile }) => (
                  <MenuItem key={key} value={key} data-isfile={isFile}>
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
