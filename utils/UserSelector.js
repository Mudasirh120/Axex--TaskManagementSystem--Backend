import Client from "../models/clientModel.js";
import Assistant from "../models/assistantModel.js";
import Admin from "../models/adminModel.js";
export const returnUser = (role) => {
  if (role === "client") {
    return Client;
  }
  if (role === "assistant") {
    return Assistant;
  }
  if (role === "admin") {
    return Admin;
  }
};
