import { updateToken } from "../utils/updateToken";
import { APIUser } from "./service.config";

//!Para el register
export const registerUser = async (formData) => {
  return APIUser.post("/users/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Para el confirmationCode

export const checkConfirmationUser = async (formData) => {
  return APIUser.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el reenvio del confirmationCode

export const resendCodeConfirmationUser = async (formData) => {
  return APIUser.post("/users/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el AutoLogin

export const autoLoginUser = async (formData) => {
  return APIUser.post("users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//!Para el Login

export const loginUserService = async (formData) => {
  return APIUser.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para ChangePassword una vez logado

export const changePasswordUserToken = async (formData) => {
  return APIUser.patch("/users/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Update user

export const updateUser = async (formData) => {
  return APIUser.patch("/users/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Delete User
// No le pasamos parametros, lo coge directamente del token
export const deleteUserService = async () => {
  return APIUser.delete("users/", {
    headers: { Authorization: `Bearer ${updateToken()}` },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ForgotPassword

export const forgotPasswordUser = async (formData) => {
  return APIUser.patch("/users/forgotpassword/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Get single next event

export const getSingleNextEvent = async () => {
  return APIUser.get("/users/get/single/next/event", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res.data.data)
    .catch((error) => error);
};

//! Get next events

export const nextEvents = async () => {
  return APIUser.get("/users/get/next/events", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Get past events

export const pastEvents = async () => {
  return APIUser.get("/users/get/past/events", {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Toggle event

export const toggleEvent = async (id) => {
  return APIUser.patch(`/users/add/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Fav organization

export const favOrganization = async (id) => {
  return APIUser.patch(`/users/fav/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!Like interested event

export const toggleLikedEvent = async (id) => {
  return APIUser.patch(`/users/fav/interest/${id}`, {
    headers: {
      Authorization: `Bearer ${updateToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!Get by id

export const getUserById = async (id) => {
  return APIUser.get(`/users/${id}`)
    .then((res) => res)
    .catch((error) => error);
};
