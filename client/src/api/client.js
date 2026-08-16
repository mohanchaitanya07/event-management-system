const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const apiGet = (path) => request(path);

export const apiPost = (path, body) =>
  request(path, { method: "POST", body: JSON.stringify(body) });

export const apiPatch = (path, body) =>
  request(path, { method: "PATCH", body: JSON.stringify(body) });
