import { LoginView } from "../views/AuthViews/LoginView";
import { SignUpView } from "../views/AuthViews/SignUpView";
import { DoctorLandingView } from "../views/Doctor/DoctorLandingView";
import { Landing } from "../views/Landing/Landing";
import { NotfoundPage } from "../views/NotFoundPage/NotfoundPage";
import { PatientHomeView } from "../views/Patient/PatientHomeView";

type route = {
  path: string,
  component: React.FC,
}

const patientPaths: {[name:string]: route} = {
  patientHome: {path: '/pat/home', component: PatientHomeView},
  patientProfile: {path: '/pat/profile', component: NotfoundPage},
}

const doctorPaths: {[name:string]: route} = {
  doctorLanding: {path: '/med/landing', component: DoctorLandingView},
  doctorpatients: {path: '/med/patients', component: NotfoundPage },
}

const generalPaths: {[name:string]: route} = {
  default: { path: '/', component: Landing },
  login: { path: '/login', component: LoginView },
  signin: { path: '/signup', component: SignUpView },
  contact: { path: '/contact', component: NotfoundPage },
  notFound: {path: '/404', component: NotfoundPage },
}

export const routes:{[name:string]: route} = {
  ...generalPaths,
  ...patientPaths,
  ...doctorPaths,
};
