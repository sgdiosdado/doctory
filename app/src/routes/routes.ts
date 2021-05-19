import { LoginView } from "../views/AuthViews/LoginView";
import { SignUpView } from "../views/AuthViews/SignUpView";
import { Home } from "../views/Landing/Home";
import { Landing } from "../views/Landing/Landing";
import { NotfoundPage } from "../views/NotFoundPage/NotfoundPage";
import { PatientConditions } from "../views/Patient/PatientConditions";
import { ProfileView } from "../views/Profile/ProfileView";

type route = {
  path: string,
  component: React.FC,
}

export const publicRoutes: { [name: string]: route } = {
  default: { path: '/', component: Landing },
  login: { path: '/login', component: LoginView },
  signup: { path: '/signup', component: SignUpView },
  contact: { path: '/contact', component: NotfoundPage },
  notFound: { path: '/404', component: NotfoundPage },
}

export const protectedRoutes: { [name: string]: route } = {
  profile: { path: '/profile', component: ProfileView },
  home: { path: '/home', component: Home },
  patient: { path: '/patient/:id', component: PatientConditions },
  sharedWith: { path: '/shared-with', component: SharedWith },
}

export const routes: { [name: string]: route } = {
  ...publicRoutes,
  ...protectedRoutes,
};
