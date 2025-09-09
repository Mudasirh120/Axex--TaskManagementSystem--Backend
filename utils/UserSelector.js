import Client from "../models/clientModel.js";
import Assistant from "../models/assistantModel.js";
export const returnUser = (role) => {
  if (role === "client") {
    return Client;
  }
  if (role === "Assistant") {
    return Assistant;
  }
};
