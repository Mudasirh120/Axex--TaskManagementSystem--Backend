import Client from "../models/clientModel";
import Assistant from "../models/assistantModel";
export const returnUser = (role) => {
  if (role === "client") {
    return Client;
  }
  if (role === "Assistant") {
    return Assistant;
  }
};
