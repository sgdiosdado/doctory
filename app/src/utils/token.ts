
export const getToken = () => {
  return localStorage.getItem('doctory_token');
}
export const setToken = (token: string) => {
  localStorage.setItem('doctory_token', token);
}