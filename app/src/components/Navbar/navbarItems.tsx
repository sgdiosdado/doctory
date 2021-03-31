import { paths } from "../../routes/paths";

export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  path?: string;
}

export const navbarItems: Array<NavItem> = [
  {
    label: 'Inicio',
    path: paths.default,
  },
  {
    label: 'Contacto',
    path: paths.contact,
  },
]

// ---------- STRUCTURE-----------
// {
//   label: 'Compartir',
//   path: '/share',
// },
// {
//   label: 'Doctores',
//   children: [
//     {
//       label: 'Job Board',
//       subLabel: 'Find your dream design job',
//       path: '#',
//     },
//     {
//       label: 'Freelance Projects',
//       subLabel: 'An exclusive list for contract work',
//       path: '#',
//     },
//   ],
// },
