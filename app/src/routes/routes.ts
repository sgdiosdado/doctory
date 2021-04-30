import { LoginView } from "../views/AuthViews/LoginView";
import { SignUpView } from "../views/AuthViews/SignUpView";
import { DoctorLandingView } from "../views/Doctor/DoctorLandingView";
import { Landing } from "../views/Landing/Landing";
import { NotfoundPage } from "../views/NotFoundPage/NotfoundPage";
import { PatientHomeView } from "../views/Patient/PatientHomeView";
import { ProfileView } from "../views/Profile/ProfileView";

type route = {
  path: string,
  component: React.FC,
}

const patientPaths: { [name: string]: route } = {
  patientHome: { path: '/pat/home', component: PatientHomeView },
}

const doctorPaths: { [name: string]: route } = {
  doctorLanding: { path: '/med/landing', component: DoctorLandingView },
  doctorpatients: { path: '/med/patients', component: NotfoundPage },
}

const generalPaths: { [name: string]: route } = {
  default: { path: '/', component: Landing },
  login: { path: '/login', component: LoginView },
  signup: { path: '/signup', component: SignUpView },
  profile: {path: '/profile', component: ProfileView},
  contact: { path: '/contact', component: NotfoundPage },
  notFound: { path: '/404', component: NotfoundPage },
}

export const routes: { [name: string]: route } = {
  ...generalPaths,
  ...patientPaths,
  ...doctorPaths,
};
