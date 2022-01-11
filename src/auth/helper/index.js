// 1st import api is from envirnment variable .env, our backend api url
import { API } from "../../backend";

/* SIGNUP */
export const signup = (user) => {
  // getting user as param from frontend

  // talk to backend
  return fetch(`${API}/signup`, {
    method: "POST", // post or get
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), // passing body as our json object
  })
    .then((response) => {
      return response.json(); // returning response as json comming from backend
    }) // if everything goes right
    .catch((err) => console.log(err)); // if error;
};

/* SIGNIN */
export const signin = (user) => {
  // getting user as param from frontend

  // talk to backend
  return fetch(`${API}/signin`, {
    method: "POST", // post or get
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user), // passing body as our json object
  })
    .then((response) => {
      return response.json(); // returning response as json comming from backend
    }) // if everything goes right
    .catch((err) => console.log(err)); // if error;
};

// we got response from signin but browser doesn't remembers that
// so for that we have to do some more things

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

/* SIGNOUT */
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout Success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
