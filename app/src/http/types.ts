
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
  user_type: string,
}

export type ChangePasswordData = {
  password1: string;
  password2: string;
}

export type userInformation = {
  id?: number,
  type: string[],
  first_name: string,
  last_name: string,
  email: string,
  location?: string,
  dob?: string,
  sex?: string,
  blood_type?: string,
  allergies?: string[],
  license?: string,
  specialties?: string[],
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
  email: string;
}