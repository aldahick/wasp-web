import { RouteComponentProps } from "react-router";
import { IndexScene } from "./scene";
import { AdminUsersScene } from "./scene/admin/users";
import { LoginScene } from "./scene/login";
import { LogoutScene } from "./scene/logout";
import { MediaScene } from "./scene/media";
import { StoryCategoriesScene } from "./scene/stories/categories";
import { StoryCategoryScene } from "./scene/stories/category";
import { StoryFavoritesScene } from "./scene/stories/favorites";
import { StoryScene } from "./scene/stories/story";
import { WestWingEpisodeScene } from "./scene/westWing/episode";
import { WestWingEpisodesScene } from "./scene/westWing/episodes";
import { StorySeriesScene } from "./scene/stories/series";

interface SceneDefinition {
  component: React.ComponentType<any>;
  route: string;
  isPrivate: boolean;
  navbarLinks?(props: RouteComponentProps): {[key: string]: string};
}

const scenes: SceneDefinition[] = [
  {
    component: IndexScene,
    route: "/",
    isPrivate: false
  },
  {
    component: LoginScene,
    route: "/login",
    isPrivate: false
  },
  {
    component: LogoutScene,
    route: "/logout",
    isPrivate: false
  },
  {
    component: MediaScene,
    route: "/media",
    isPrivate: true
  },
  {
    component: StoryCategoriesScene,
    route: "/stories/categories",
    isPrivate: true
  },
  {
    component: StoryFavoritesScene,
    route: "/stories/favorites",
    isPrivate: true
  },
  {
    component: StoryCategoryScene,
    route: "/stories/category/:categoryId",
    isPrivate: true
  },
  {
    component: StorySeriesScene,
    route: "/stories/series/:seriesId",
    isPrivate: true
  },
  {
    component: StoryScene,
    route: "/stories/:storyId",
    isPrivate: true
  },
  {
    component: AdminUsersScene,
    route: "/admin/users",
    isPrivate: true
  },
  {
    component: WestWingEpisodesScene,
    route: "/westwing/episodes",
    isPrivate: false
  },
  {
    component: WestWingEpisodeScene,
    route: "/westwing/episodes/:episodeId",
    isPrivate: false
  }
];

export default scenes;
