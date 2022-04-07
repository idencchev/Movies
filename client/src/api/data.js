import * as api from "./api.js";

const endpoints = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  verify: "/api/auth/verify",
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

