
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

export type FunctionOk = (statusCode: number, data: Object | Array<Object>) => void;
export type FunctionError = (statusCode: number, errors: Object) => void;

export type LoginError = {
  credentials: Array<string>;
}