export const authHeaders = () => {
  const token = localStorage.getItem('token'); // ou context (ex: auth?.token)
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};