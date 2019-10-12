import { Button } from "@material-ui/core";
import React from "react";
import { CreateUserForm } from "../../component/admin/CreateUserForm";
import { UserList } from "../../component/admin/UserList";

interface AdminUsersState {
  isCreatingUser: boolean;
}

export class AdminUsersScene extends React.Component<{}, AdminUsersState> {
  readonly state: AdminUsersState = {
    isCreatingUser: false
  };

  render() {
    if (this.state.isCreatingUser) {
      return <CreateUserForm onComplete={() => this.setState({ isCreatingUser: false })} />;
    }
    return (
      <UserList>
        <Button onClick={() => this.setState({ isCreatingUser: true })}>Create User</Button>
      </UserList>
    );
  }
}
