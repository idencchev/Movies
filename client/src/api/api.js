const host = "http://localhost:80";

async function request(url, options) {
  try {
    const response = await fetch(host + url, options);
    if (!response.ok) {
      const error = await response.json();
      throw error.error;
    }

    return response.json();
  } catch (err) {
    throw err;
  }
}

function createOptions(method = "GET", data) {
  const options = {
    credentials: "include",
    method,
    headers: {},
  };
  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  return options;
}

export async function get(url) {
  return request(url, createOptions());
}

export async function post(url, data) {
  return request(url, createOptions("POST", data));
}

export async function put(url, data) {
  return request(url, createOptions("PUT", data));
}

export async function del(url) {
  return request(url, createOptions("DELETE"));
}