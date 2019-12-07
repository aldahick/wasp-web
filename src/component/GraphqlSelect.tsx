import { FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { DocumentNode } from "graphql";
import React from "react";
import { Query } from "react-apollo";

export interface GraphqlSelectProps<GraphqlResult, GraphqlVariables> {
  query: DocumentNode;
  variables: GraphqlVariables;
  inputLabel: string;
  onChange(value: string): void;
  getOptions(result: GraphqlResult): { label?: string; value: string; }[];
}

export interface GraphqlSelectState {
  selected?: string;
}

export class GraphqlSelect<GraphqlResult, GraphqlVariables> extends React.Component<GraphqlSelectProps<GraphqlResult, GraphqlVariables>, GraphqlSelectState> {
  readonly state: GraphqlSelectState = { };

  private onChange = (evt: React.ChangeEvent<{ value: unknown }>) => {
    const { onChange } = this.props;
    if (typeof(evt.target.value) !== "string") {
      throw new Error("non-string: " + evt.target.value);
    }
    this.setState({ selected: evt.target.value.toString() }, () => {
      onChange(this.state.selected!);
    });
  }

  render() {
    const { query, variables, inputLabel, getOptions } = this.props;
    const { selected } = this.state;
    return (
      <Query<GraphqlResult> query={query} variables={variables}>
        {({ loading, data, error }) => {
          if (loading) { return <Typography>Loading...</Typography>; }
          if (error || !data) {
            return (
              <Typography color="error">
                {error ? error.message : "No data available."}
              </Typography>
            );
          }
          const options = getOptions(data);
          return (
            <FormControl>
              <InputLabel>{inputLabel}</InputLabel>
              <Select value={selected || options[0].value} onChange={this.onChange}>
                {options.map(({ label, value }) =>
                  <MenuItem key={value} value={value}>{label || value}</MenuItem>
                )}
              </Select>
            </FormControl>
          );
        }}
      </Query>
    );
  }
}

