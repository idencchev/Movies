import * as api from "./api.js";

const endpoints = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  logout: "/api/auth/logout",
  verify: "/api/auth/verify",
  userId: (id) => `/api/auth/user/${id}`,
  favorites: "/api/favorites",
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
  setNoResults,
  navigate,
  useRefFaforiteMovies,
  addMovieData
) => {
  if (searchQuery) {
    const response = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchQuery}`,
      {
        method: "GET",
      }
    );

    const fetchData = await response.json();
    let data = [];
    fetchData.forEach((movie) => {
      data.push(movie.show);
    });

    data.forEach((movie) => {
      const checkIsFavorite = useRefFaforiteMovies.current.some((id) => {
        return id == movie.id;
      });

      if (checkIsFavorite) {
        movie["isFavorite"] = false;
      } else {
        movie["isFavorite"] = true;
      }
    });

    if (data.length) {
      addMovieData(data);
      setNoResults(false);
      navigate(`/search/${searchQuery}`);
    } else {
      setNoResults(true);
      navigate(`/search/${searchQuery}`);
    }
  } else {
    const allMoviesData = await getAllMovies();
    allMoviesData.forEach((movie) => {
      const checkIsFavorite = useRefFaforiteMovies.current.some((id) => {
        return id == movie.id;
      });
      if (checkIsFavorite) {
        movie["isFavorite"] = false;
      } else {
        movie["isFavorite"] = true;
      }
    });
    console.log("sfsddfg");
    addMovieData(allMoviesData);
    setNoResults(false);
    //  navigate(`/search`);
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
  try {
    const response = await api.get(endpoints.userId(id));
    return response;
  } catch (error) {
    throw error;
  }
}

export async function addFavoriteMovie(data) {
  try {
    const response = await api.post(endpoints.favorites, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function deleteFavoriteMovie(data) {
  try {
    const response = await api.put(endpoints.favorites, data);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getMovieByTitle(title) {
  try {
    const response = await fetch(
      `https://api.tvmaze.com/singlesearch/shows?q=${title}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (error) {
    throw error;
  }
}
