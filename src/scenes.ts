import { RouteComponentProps } from "react-router";
import { IndexScene } from "./scene";
import { LoginScene } from "./scene/login";
import { LogoutScene } from "./scene/logout";
import { MediaScene } from "./scene/media";
import { StoryScene } from "./scene/story";
import { StoryCategoriesScene } from "./scene/storyCategories";
import { StoryCategoryScene } from "./scene/storyCategory";
import { StoryFavoritesScene } from "./scene/storyFavorites";

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
    isPrivate: true
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
    route: "/storyCategories",
    isPrivate: true
  },
  {
    component: StoryFavoritesScene,
    route: "/storyFavorites",
    isPrivate: true
  },
  {
    component: StoryCategoryScene,
    route: "/storyCategory/:categoryId",
    isPrivate: true
  },
  {
    component: StoryScene,
    route: "/story/:storyId",
    isPrivate: true
  }
];

export default scenes;
