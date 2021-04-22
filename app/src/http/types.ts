
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

export type ConditionData = {
  id?: number;
  name: string;
  description: string;
  date_of_diagnosis: string;
  background_subtype: string | number;
}

export type BackgroundSubtypeData = {
  id?: number;
  name: string;
  description: string;
}

export type UserInformationData = {
  first_name: string,
  last_name: string,
  dob: string,
  email: string,
  location?: string,
  bloodType?: string,
  alergies?: string[],
}

export type FunctionOk = (statusCode: number, data: Object | Array<Object>) => void;
export type FunctionError = (statusCode: number, errors: Object) => void;

export type LoginError = {
  credentials: Array<string>;
}