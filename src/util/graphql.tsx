import { Typography } from "@material-ui/core";
import React from "react";
import { MutationFunction, QueryComponentOptions, QueryResult } from "react-apollo";

export const callMutationSafe = async <D, V>(mutation: MutationFunction<D, V>, variables: V): Promise<D> =>  {
  const res = await mutation({ variables });
  if (!res) {
    throw new Error("no response");
  } else if (res.errors) {
    console.error(res.errors);
    throw new Error("Server-side error occurred:\n" + res.errors.map(e => e.message).join("\n"));
  } else if (!res.data) {
    throw new Error("no data");
  }
  return res.data;
};

// Trailing comma is necessary because Typescript thinks <Data> is a JSX tag otherwise
export const checkQueryResult = <Data,>(callback: (data: Data) => JSX.Element | null): QueryComponentOptions["children"] =>
  ({ loading, data, error }: QueryResult<Data>) => {
    if (loading) {
      return <Typography>Loading...</Typography>;
    }
    if (error || !data) {
      return (
        <Typography color="error">
          {error ? error.message : "No data available."}
        </Typography>
      );
    }
    return callback(data);
  };
