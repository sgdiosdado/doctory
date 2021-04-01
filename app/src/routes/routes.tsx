import { LoginView } from "../components/AuthComponents/LoginView";
import { SigninView } from "../components/AuthComponents/SigninView";
import { DoctorLandingView } from "../components/Doctor/DoctorLandingView";
import { Landing } from "../components/Landing/Landing";
import { NotfoundPage } from "../components/NotFoundPage/NotfoundPage";
import { PacientLandingView } from "../components/Pacient/PacientLandingView";

type route = {
  path: string,
  component: React.FC,
}

const pacientPaths: {[name:string]: route} = {
  pacientLanding: {path: '/pac/landing', component: PacientLandingView},
  pacientNewCondition: {path: '/pac/new-condition', component: NotfoundPage}, // TODO: NewCondition component
  pacientStudies: {path: '/pac/studies', component: NotfoundPage}, // TODO: Studies component
  pacientProfile: {path: '/pac/profile', component: NotfoundPage}, // TODO: Profile component (check if will be the same for doctor?¿)
  pacientShareHistory: {path: '/pac/profile', component: NotfoundPage}, //TODO: Profile component (check if will be the same for doctor?¿)
}

const doctorPaths: {[name:string]: route} = {
  doctorLanding: {path: '/med/landing', component: DoctorLandingView},
  doctorPacients: {path: '/med/pacients', component: NotfoundPage}, // TODO: Doctors view on pacients component 
  // TODO: check which others paths are required
}

const generalPaths: {[name:string]: route} = {
  default: { path: '/', component: Landing },
  login: { path: '/login', component: LoginView },
  signin: { path: '/signin', component: SigninView },
  contact: { path: '/contact', component: NotfoundPage }, // TODO: Contanct component
  notFound: {path: '/404', component: NotfoundPage },
}

export const routes:{[name:string]: route} = {
  ...generalPaths,
  ...pacientPaths,
  ...doctorPaths,
};
