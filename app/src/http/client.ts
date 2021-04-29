import { 
  userInformation,
  LoginData,
  SignUpData,
  ConditionData,
  ChangePasswordData
} from './types';
import { getToken, setToken } from '../utils/token';

class Http {
  private url = process.env.REACT_APP_HOST_IP_ADDRESS;

  public async login(fields:LoginData) {
    const res = await fetch(`${this.url}/api/v1/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json();
    
    if(res.status === 200) return setToken(data.data.token);
    
    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }

  public async signup(fields:SignUpData) {
    const res = await fetch(`${this.url}/api/v1/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json();

    if(res.status === 201) return setToken(data.data.token);
    
    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }
  
  public async newCondition(fields:ConditionData) {
    const res = await fetch(`${this.url}/api/v1/conditions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json();

    if(res.status === 201) return data.data;

    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }

  public async conditions() {
    const res = await fetch(`${this.url}/api/v1/conditions/`, {
      headers: {
        'Authorization': `Token ${getToken()}`
      }
    });
    const data = await res.json();
    
    if(res.status === 200) return data.data;
    
    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }

  public async backgroundSubtypes() {
    const res = await fetch(`${this.url}/api/v1/background-subtypes/`, {
      headers: {
        'Authorization': `Token ${getToken()}`
      }
    });
    const data = await res.json();
    if(res.status === 200) return data.data;

    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }

  public async getProfileInfo() {
    const res = await fetch(`${this.url}/api/v1/profile/`, {
      headers: {
        'Authorization': `Token ${getToken()}`
      }
    });
    const data = await res.json();

    if(res.status === 200) return data.data;
    
    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }

  public async updateProfile(fields:userInformation) {
    const res = await fetch(`${this.url}/api/v1/profile/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json();

    if(res.status === 200) return data.data;
    
    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }

  public async updatePassword(fields:ChangePasswordData) {
    const res = await fetch(`${this.url}/api/v1/change-password/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields)
    });
    const data = await res.json();

    if(res.status === 200) return data.data;
    
    const values = Object.keys(data.errors).map(key => data.errors[key].join(';'))[0]
    if(res.status === 400) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }
}

export const http = new Http();
