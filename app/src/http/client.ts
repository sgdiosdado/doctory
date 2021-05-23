import { 
  userInformation,
  LoginData,
  SignUpData,
  ConditionData,
  ChangePasswordData,
  ShareData
} from './types';
import { getToken, setToken } from '../utils/token';

class Http {
  private url = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : document.location.origin;

  public async getUserType() {
    const res = await fetch(`${this.url}/api/v1/type/`, {
      headers: {
        'Authorization': `Token ${getToken()}`
      }
    });
    const data = await res.json();

    if(res.status === 200) return data.data.types;
    return null;
  }

  public async login(fields:LoginData) {
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
      return data.data.types;
    }
    
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

    if(res.status === 201) {
      setToken(data.data.token);
      return data.data.types;
    }
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

  public async conditions(id:number|null = null) {
    const params = id? `?patient_id=${id}` : ''
    const res = await fetch(`${this.url}/api/v1/conditions/${params}`, {
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

  public async getProfileInfo(id:number|null = null) {
    const params = id? `?patient_id=${id}` : ''
    const res = await fetch(`${this.url}/api/v1/profile/${params}`, {
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

  public async getPatients() {
    const res = await fetch(`${this.url}/api/v1/patients/`, {
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

  public async shareHistory(fields:ShareData) {
    const res = await fetch(`${this.url}/api/v1/share-history/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${getToken()}`
      },
      body: JSON.stringify(fields)
    });
    
    const data = await res.json();
    if(res.status === 201) return data.data;

    const values = Object.keys(data.errors).map(key => data.errors[key]).join(';')
    if(res.status === 400) throw new Error(values)
    if(res.status === 404) throw new Error(values)
    if(res.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }

  public async getMedics() {
    const res = await fetch(`${this.url}/api/v1/shared-with/`, {
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
  public async removeShare(id:number|null = null) {
    //const params = id? `?medic_id=${id}` : ''
    const params = id? `${id}` : ''
    
    const res = await fetch(`${this.url}/api/v1/shared-with/${params}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${getToken()}`
      },
    });
    
    const data = await res;
    //if(res.status === 204) return data;

    /*const values = Object.keys(data.errors).map(key => data.errors[key]).join(';')
    if(data.status === 400) throw new Error(values)
    if(data.status === 404) throw new Error(values)
    if(data.status === 405) throw new Error(values)*/
    if(data.status === 500) throw new Error('Error con el servidor. Contacte al equipo administrador.')
  }
}

export const http = new Http();
