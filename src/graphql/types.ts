export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: File;
  DateTime: Date;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

export type MediaItem = {
  __typename?: "MediaItem";
  key: Scalars["String"];
  isFile: Scalars["Boolean"];
};

export type Mutation = {
  __typename?: "Mutation";
  createSystemToken: Scalars["String"];
  createUserToken: Scalars["String"];
  addPermissionsToRole: Scalars["Boolean"];
  createRole: Role;
  addRoleToUser: Scalars["Boolean"];
  createUser: User;
  updateUserProfile: User;
};

export type MutationCreateUserTokenArgs = {
  id?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type MutationAddPermissionsToRoleArgs = {
  roleId: Scalars["String"];
  permissions: Array<Maybe<Permission>>;
};

export type MutationCreateRoleArgs = {
  name: Scalars["String"];
};

export type MutationAddRoleToUserArgs = {
  userId?: Maybe<Scalars["String"]>;
  roleId: Scalars["String"];
};

export type MutationCreateUserArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationUpdateUserProfileArgs = {
  id?: Maybe<Scalars["String"]>;
  profile: UserProfileInput;
};

export enum Permission {
  ManageRoles = "manageRoles",
  ManageUsers = "manageUsers"
}

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
  listMedia: Array<Maybe<MediaItem>>;
  roles: Array<Maybe<Role>>;
  user?: Maybe<User>;
};

export type QueryListMediaArgs = {
  dir: Scalars["String"];
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["String"]>;
};

export type Role = {
  __typename?: "Role";
  _id: Scalars["String"];
  name: Scalars["String"];
  permissions: Array<Maybe<Permission>>;
};

export type User = {
  __typename?: "User";
  _id: Scalars["String"];
  profile: UserProfile;
  roles: Array<Maybe<Role>>;
};

export type UserProfile = {
  __typename?: "UserProfile";
  firstName?: Maybe<Scalars["String"]>;
  fullName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
};

export type UserProfileInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
};
