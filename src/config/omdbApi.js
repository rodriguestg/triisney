import axios from "axios";

const omdbApi = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  params: {
    apiKey: process.env.OMDB_API_KEY,
  },
});

export default omdbApi;