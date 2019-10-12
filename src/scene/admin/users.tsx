import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core";
import { Query } from "react-apollo";

export class AdminUsersScene extends React.Component {
  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Query>
            
          </Query>
        </TableBody>
      </Table>
    );
  }
}
