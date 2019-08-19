import { IndexScene } from "./scene";
import { LoginScene } from "./scene/login";
import { MediaScene } from "./scene/media";
import { LogoutScene } from "./scene/logout";
import { StoryCategoriesScene } from "./scene/storyCategories";
import { StoryCategoryScene } from "./scene/storyCategory";
import { StoryScene } from "./scene/story";
import { RouteComponentProps } from "react-router";

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
    component: StoryCategoryScene,
    route: "/storyCategory/:categoryId",
    isPrivate: true,
    navbarLinks(props: RouteComponentProps) {
      return {
        "Categories": "/storyCategories"
      };
    }
  },
  {
    component: StoryScene,
    route: "/story/:categoryId/:storyId",
    isPrivate: true,
    navbarLinks(props: RouteComponentProps<{ categoryId: string }>) {
      return {
        "Category": `/storyCategory/${props.location.pathname.split("/")[2]}`
      };
    }
  }
];

export default scenes;
