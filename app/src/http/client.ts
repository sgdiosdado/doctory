import { LoginData, FunctionOk, FunctionError, SignUpData } from './types';
import { setToken } from '../utils/token';

const defaultOk:FunctionOk = (status, data) => {return};
const defaultError:FunctionError = (status, errors) => {return};

class Http {
  // private url = 'http://localhost:8000'
  private url = document.location.origin

  public async login(fields:LoginData, ok:FunctionOk=defaultOk, error:FunctionError=defaultError) {
    const res = await fetch(`${this.url}/api/v1/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json();

    if(res.status === 200) {
      setToken(data.data.token);
      ok(res.status, data.data);
      return;
    }
    error(res.status, data.errors);
  }

  public async signup(fields:SignUpData, ok:FunctionOk=defaultOk, error:FunctionError=defaultError) {
    const res = await fetch(`${this.url}/api/v1/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json();

    if(res.status === 201) {
      setToken(data.data.token);
      ok(res.status, data.data);
      return;
    }
    error(res.status, data.errors);
  }
}

export const http = new Http();