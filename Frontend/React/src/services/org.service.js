import { updateOrgToken } from "../utils/updateOrgToken";
import { APIUser } from "./service.config";

//!Para el register
export const registerOrg = async (formData) => {
  return APIUser.post("/organizations/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Para el confirmationCode

export const checkConfirmationOrg = async (formData) => {
  return APIUser.post("/organizations/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el reenvio del confirmationCode

export const resendCodeConfirmationOrg = async (formData) => {
  return APIUser.post("/organizations/resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para el AutoLogin

export const autoLoginOrg = async (formData) => {
  return APIUser.post("organizations/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

//!Para el Login

export const loginOrgService = async (formData) => {
  return APIUser.post("/organizations/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

//! Para ChangePassword una vez logado

export const changePasswordOrgToken = async (formData) => {
  return APIUser.patch("/organizations/changepassword", formData, {
    headers: {
      Authorization: `Bearer ${updateOrgToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Update Org

export const updateOrg = async (formData) => {
  return APIUser.patch("/organizations/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateOrgToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! Delete Org
// No le pasamos parametros, lo coge directamente del token
export const deleteOrgService = async () => {
  return APIUser.delete("organizations/", {
    headers: { Authorization: `Bearer ${updateOrgToken()}` },
  })
    .then((res) => res)
    .catch((error) => error);
};

//! ForgotPassword

export const forgotPasswordOrg = async (formData) => {
  return APIUser.patch("/organizations/forgotpassword/forgotpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

//!Get by id

export const getOrgById = async (id) => {
  return APIUser.get(`/organizations/${id}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};

//!Get past Events from Org

export const getPastEventsfromOrg = async (id) => {
  return APIUser.get(`/organizations/get/past/events/${id}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};

//!Get next Events from Org

export const getNextEventsfromOrg = async (id) => {
  return APIUser.get(`/organizations/get/next/events/${id}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};
