
export type LoginData = {
  email: string;
  password: string;
}

export type SignUpData = {
  first_name: string;
  last_name: string;
  email: string;
  password1: string;
  password2: string;
}

export type ChangePasswordData = {
  password1: string;
  password2: string;
}

export type userInformation = {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
  location?: string,
  dob?: string,
  sex?: string,
  patient?: {
    blood_type: string,
    allergies: string[],
  },
  medic?: {
    license: string,
    specialties: string[],
  },
  type: string[],
}

export type ConditionData = {
  id?: number;
  name: string;
  description: string;
  date_of_diagnosis: string;
  background_subtype: string | number;
  background_subtype_name?: string;
}

export type BackgroundSubtypeData = {
  id?: number;
  name: string;
  description: string;
}

export type ShareData = {
  id?: number;
  email: string;
}