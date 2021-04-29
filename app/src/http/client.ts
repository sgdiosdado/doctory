import { userInformation, LoginData, FunctionOk, FunctionError, SignUpData, ConditionData } from './types';
import { getToken, setToken } from '../utils/token';

const defaultOk:FunctionOk = (status, data) => {return};
const defaultError:FunctionError = (status, errors) => {return};

class Http {
  private url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : document.location.origin;

  public async login(
    fields:LoginData,
    ok:FunctionOk=defaultOk,
    error:FunctionError=defaultError,
    connectionError=() => {}) {
    try {
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
    } catch (err) {
      connectionError();
    }
  }

  public async signup(
    fields:SignUpData,
    ok:FunctionOk=defaultOk,
    error:FunctionError=defaultError,
    connectionError=() => {}) {
    try {
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
    } catch(err) {
      connectionError();
    }
  }
  
  public async newCondition(
    fields:ConditionData,
    ok:FunctionOk=defaultOk, 
    error:FunctionError=defaultError,
    connectionError=() => {}) {
    try {
      const res = await fetch(`${this.url}/api/v1/conditions/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${getToken()}`
        },
        body: JSON.stringify(fields)
      });

      const data = await res.json();
      if(res.status === 201) {
        ok(res.status, data.data);
        return;
      }
      error(res.status, data.errors);
    } catch (err) {
      connectionError()
    }
  }

  public async conditions(
    ok:FunctionOk=defaultOk,
    error:FunctionError=defaultError,
    connectionError=()=>{}) {
      try {
        const res = await fetch(`${this.url}/api/v1/conditions/`, {
          headers: {
            'Authorization': `Token ${getToken()}`
          }
        });
  
        const data = await res.json();
        if(res.status === 200) {
          ok(res.status, data.data);
          return;
        }
        error(res.status, data.error);
      } catch (err) {
        connectionError();
      }
    }

  public async backgroundSubtypes(
    ok:FunctionOk=defaultOk,
    error:FunctionError=defaultError,
    connectionError=()=>{}) {
      try {
        const res = await fetch(`${this.url}/api/v1/background-subtypes/`, {
          headers: {
            'Authorization': `Token ${getToken()}`
          }
        });
  
        const data = await res.json();
        if(res.status === 200) {
          ok(res.status, data.data);
          return;
        }
        error(res.status, data.error);
      } catch (err) {
        connectionError();
      }
    }

  public async getProfileInfo(
    ok:FunctionOk=defaultOk, 
    error:FunctionError=defaultError, 
    connectionError=()=>{}) {
    try {
      const res = await fetch(`${this.url}/api/v1/profile/`, {
        headers: {
          'Authorization': `Token ${getToken()}`
        },
      });
      const data = await res.json();
      if(res.status === 200) {
        ok(res.status, data.data);
        return;
      }
      error(res.status, data.errors);
    } catch (err) {
      connectionError();
    }
  }

  public async putProfileInfo(
    fields:userInformation, 
    ok:FunctionOk=defaultOk, 
    error:FunctionError=defaultError, 
    connectionError=()=>{}) {
      try {
        const res = await fetch(`${this.url}/api/v1/profile/`, {
          method: 'PUT',
          headers: {
            'Authorization': `Token ${getToken()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fields)
        });
        const data = await res.json();

        if(res.status === 200) {
          ok(res.status, data.data);
          return;
        }
        error(res.status, data.errors,);
      } catch (error) {
        connectionError();
      }
  }
}

export const http = new Http();
