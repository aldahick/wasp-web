import { IndexScene } from "./scene";
import { LoginScene } from "./scene/login";
import { MediaScene } from "./scene/media";
import { LogoutScene } from "./scene/logout";
import { StoryCategoriesScene } from "./scene/storyCategories";
import { StoryCategoryScene } from "./scene/storyCategory";

interface SceneDefinition {
  component: React.ComponentType<any>;
  route: string;
  isPrivate: boolean;
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
    component: StoryCategoryScene,
    route: "/storyCategory/:categoryId",
    isPrivate: true
  }
];

export default scenes;
