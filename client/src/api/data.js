import * as api from "./api.js";

const endpoints = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  verify: "/api/auth/verify",
  userId: (id) => `/api/auth/user/${id}`,
};

export async function loginUser(data) {
  try {
    const response = await api.post(endpoints.login, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(data) {
  try {
    const response = await api.post(endpoints.register, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await api.get(endpoints.logout);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function verifyToken() {
  try {
    const response = await api.post(endpoints.verify);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getAllMovies() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows", {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export const searchFunction = async (
  searchQuery,
  setSerachResults,
  setNoResults,
  navigate,
  getAll
) => {
  if (searchQuery) {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchQuery}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    if (data.length) {
      setSerachResults(data);
      setNoResults(false);
      navigate(`/search/${searchQuery}`);
    } else {
      setNoResults(true);
      navigate(`/search/${searchQuery}`);
    }
  } else {
    getAll();
    setNoResults(false);
    setSerachResults([]);
    navigate(`/search`);
  }
};

export async function getFavoriteMovies(id) {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getMovieById(id) {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${id}`, {
      method: "GET",
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getUserDataById(id) {
  console.log(id);
  try {
    const response = await api.get(endpoints.userId(id));
    return response;
  } catch (error) {
    throw error;
  }
}
