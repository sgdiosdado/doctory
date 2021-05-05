import { LoginView } from "../views/AuthViews/LoginView";
import { SignUpView } from "../views/AuthViews/SignUpView";
import { Landing } from "../views/Landing/Landing";
import { MedicHomeView } from "../views/Medic/MedicHomeView";
import { NotfoundPage } from "../views/NotFoundPage/NotfoundPage";
import { PatientHomeView } from "../views/Patient/PatientHomeView";
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
  home: { path: '/home', component: PatientHomeView },
  patient: { path: '/patient/:id', component: PatientHomeView },
  medic: { path: '/med/home', component: MedicHomeView }, //UNIFY WITH HOME
}

export const routes: { [name: string]: route } = {
  ...publicRoutes,
  ...protectedRoutes,
};
