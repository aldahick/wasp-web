import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { Query } from "react-apollo";
import { GET_USERS, GetUsersResult } from "../../graphql/admin/users";

interface AdminUsersState {
  limit: number;
  offset: number;
}

export class AdminUsersScene extends React.Component<{}, AdminUsersState> {
  readonly state: AdminUsersState = {
    limit: 10,
    offset: 0
  };

  render() {
    return (
      <Query<GetUsersResult> query={GET_USERS} variables={this.state}>
        {({ loading, data, error }) => {
          if (loading) { return <Typography>Loading...</Typography>; }
          if (error || !data) { return <Typography>Error occurred: {error ? error.message : "no data"}</Typography>; }
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.users.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        }}
      </Query>
    );
  }
}
