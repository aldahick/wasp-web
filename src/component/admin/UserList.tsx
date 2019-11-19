import { Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { ReactNode } from "react";
import { Query } from "react-apollo";
import { GET_USERS, GetUsersResult } from "../../graphql/admin/users";
import { QueryUsersArgs } from "../../graphql/types";

export interface UserListProps {
  children: ReactNode;
}

export interface UserListState {
  limit: number;
  offset: number;
}

export class UserList extends React.Component<UserListProps, UserListState> {
  readonly state: UserListState = {
    limit: 10,
    offset: 0
  };

  render() {
    return (
      <Grid container direction="column">
        <Grid item>
          {this.props.children}
        </Grid>
        <Grid item>
          <Query<GetUsersResult, QueryUsersArgs> query={GET_USERS} variables={this.state}>
            {({ loading, data, error }) => {
              if (loading) { return <Typography>Loading...</Typography>; }
              if (error || !data) { return <Typography color="error">Error occurred: {error ? error.message : "no data"}</Typography>; }
              return (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>Date Created</TableCell>
                      <TableCell>Roles</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.users.map(user => (
                      <TableRow key={user._id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          {user.roles.length > 0 ? user.roles.map(r =>
                            <a key={r._id} href={`/admin/roles/${r._id}`}>{r.name}</a>
                          ) : "None"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              );
            }}
          </Query>
        </Grid>
      </Grid>
    );
  }
}
