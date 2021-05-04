import { LoginView } from "../views/AuthViews/LoginView";
import { SignUpView } from "../views/AuthViews/SignUpView";
import { DoctorLandingView } from "../views/Doctor/DoctorLandingView";
import { DoctorPatientTableView } from "../views/Doctor/DoctorPatientTableView";
import { Landing } from "../views/Landing/Landing";
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
  doctorHome: { path: '/med/landing', component: DoctorLandingView }, //UNIFY WITH HOME // Can be replaced by DoctorPatientTableView until more actions are made available.
  doctorPatientsTable: {path: '/med/ListPatients', component: DoctorPatientTableView }, // List of Patients for doctor. Currently with static arrays of info.
  doctorpatients: { path: '/med/patients', component: NotfoundPage },
}

export const routes: { [name: string]: route } = {
  ...publicRoutes,
  ...protectedRoutes,
};
