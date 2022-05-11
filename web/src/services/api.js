import axios from 'axios';
export const Repositories = async () => {
  return await axios.get('http://localhost:4000/repos');
};
