export type Maybe<T> = T | undefined;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Date: any,
  Datetime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: File,
};


export type AuthToken = {
   __typename?: 'AuthToken',
  token: Scalars['String'],
  type?: Maybe<AuthTokenType>,
  user: User,
};

export enum AuthTokenType {
  System = 'system',
  User = 'user'
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}



export type MediaItem = {
   __typename?: 'MediaItem',
  key: Scalars['String'],
  type: MediaItemType,
};

export enum MediaItemType {
  File = 'file',
  Directory = 'directory',
  Series = 'series'
}

export type Mutation = {
   __typename?: 'Mutation',
  createSystemToken: AuthToken,
  createUserToken: AuthToken,
  scrapeMedia: Array<MediaItem>,
  addPermissionsToRole: Scalars['Boolean'],
  createRole: Role,
  createStoryProfile: Scalars['Boolean'],
  toggleStoryFavorite: Scalars['Boolean'],
  addRoleToUser: Scalars['Boolean'],
  createUser: User,
  updateUserProfile: User,
};


export type MutationCreateUserTokenArgs = {
  id?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>
};


export type MutationScrapeMediaArgs = {
  url: Scalars['String'],
  destination: Scalars['String']
};


export type MutationAddPermissionsToRoleArgs = {
  roleId: Scalars['String'],
  permissions: Array<Maybe<Permission>>
};


export type MutationCreateRoleArgs = {
  name: Scalars['String']
};


export type MutationCreateStoryProfileArgs = {
  username: Scalars['String'],
  password: Scalars['String']
};


export type MutationToggleStoryFavoriteArgs = {
  id: Scalars['Int']
};


export type MutationAddRoleToUserArgs = {
  userId?: Maybe<Scalars['String']>,
  roleId: Scalars['String']
};


export type MutationCreateUserArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpdateUserProfileArgs = {
  id?: Maybe<Scalars['String']>,
  profile: UserProfileInput
};

export enum Permission {
  Media = 'media',
  ManageRoles = 'manageRoles',
  ManageUsers = 'manageUsers',
  Stories = 'stories'
}

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  listMedia: Array<MediaItem>,
  roles: Array<Maybe<Role>>,
  story: Story,
  storiesByCategory: StoriesResult,
  storiesBySeries: StoriesResult,
  favoriteStories: StoriesResult,
  storyCategories: Array<StoryCategory>,
  user?: Maybe<User>,
  users: Array<User>,
  westWingEpisode: WestWingEpisode,
  westWingEpisodes: Array<WestWingEpisode>,
  westWingSeasons: Array<WestWingSeason>,
};


export type QueryListMediaArgs = {
  dir: Scalars['String']
};


export type QueryStoryArgs = {
  id: Scalars['Int']
};


export type QueryStoriesByCategoryArgs = {
  categoryId: Scalars['Int'],
  page?: Maybe<Scalars['Int']>
};


export type QueryStoriesBySeriesArgs = {
  seriesId: Scalars['Int'],
  page?: Maybe<Scalars['Int']>
};


export type QueryFavoriteStoriesArgs = {
  page?: Maybe<Scalars['Int']>
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryUsersArgs = {
  limit: Scalars['Int'],
  offset: Scalars['Int']
};


export type QueryWestWingEpisodeArgs = {
  id: Scalars['Int']
};


export type QueryWestWingEpisodesArgs = {
  seasonId: Scalars['Int']
};

export type Role = {
   __typename?: 'Role',
  _id: Scalars['String'],
  name: Scalars['String'],
  permissions: Array<Maybe<Permission>>,
};

export type StoriesResult = {
   __typename?: 'StoriesResult',
  pageCount: Scalars['Int'],
  stories: Array<Story>,
};

export type Story = {
   __typename?: 'Story',
  id: Scalars['Int'],
  categoryId?: Maybe<Scalars['Int']>,
  title: Scalars['String'],
  description: Scalars['String'],
  body?: Maybe<Scalars['String']>,
  series?: Maybe<StorySeries>,
};

export type StoryCategory = {
   __typename?: 'StoryCategory',
  id: Scalars['Int'],
  name: Scalars['String'],
  description: Scalars['String'],
  code: Scalars['String'],
};

export type StorySeries = {
   __typename?: 'StorySeries',
  id: Scalars['Int'],
  stories: Array<Story>,
};


export type User = {
   __typename?: 'User',
  _id: Scalars['String'],
  createdAt: Scalars['Date'],
  email: Scalars['String'],
  permissions: Array<Permission>,
  profile: UserProfile,
  roles: Array<Role>,
};

export type UserProfile = {
   __typename?: 'UserProfile',
  firstName?: Maybe<Scalars['String']>,
  fullName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type UserProfileInput = {
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
};

export type WestWingEpisode = {
   __typename?: 'WestWingEpisode',
  _id: Scalars['Int'],
  title: Scalars['String'],
  airedAt: Scalars['Date'],
  number: Scalars['Int'],
  season: WestWingSeason,
  transcript?: Maybe<Scalars['String']>,
};

export type WestWingSeason = {
   __typename?: 'WestWingSeason',
  _id: Scalars['Int'],
};

