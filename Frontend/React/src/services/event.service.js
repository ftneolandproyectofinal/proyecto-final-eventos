import { updateOrgToken } from "../utils/updateOrgToken";
import { APIUser } from "./service.config";

//! Get by id

export const getEventById = async (id) => {
  return APIUser.get(`/events/${id}`)
    .then((res) => res.data.data)
    .catch((error) => error);
};

//! Get by name

export const getEventByName = async (name) => {
  return APIUser.get(`/events/getbyname/${name}`)
    .then((res) => res.data?.data)
    .catch((error) => error);
};

//! Get all events

export const getAllEvents = async () => {
  return APIUser.get("/events/get/all")
    .then((res) => res.data?.data)
    .catch((error) => error);
};

//!Create event
export const createEvent = async (formData) => {
  return APIUser.post("/events/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${updateOrgToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

//!GetEstablishments
export const getAllEstablishments = async () => {
  return APIUser.get("/establishments/getAllEstablishments")
    .then((res) => res.data?.data)
    .catch((error) => error);
};

//!Delete
export const deleteEventService = async (id) => {
  return APIUser.delete(`/events/${id}`, {
    headers: { Authorization: `Bearer ${updateOrgToken()}` },
  })
    .then((res) => res)
    .catch((error) => error);
};
