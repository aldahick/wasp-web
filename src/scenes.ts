import { IndexScene } from "./scene";
import { LoginScene } from "./scene/login";
import { MediaScene } from "./scene/media";
import { LogoutScene } from "./scene/logout";

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
  }
];

export default scenes;
