import axios from 'axios';

export const api = axios.create({
  // Desta forma ele reaproveita o url que ja existe
  baseURL: '/api'
})