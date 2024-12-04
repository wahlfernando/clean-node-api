import { HttpResposnse } from "../protocols/http";

export const badRequest = (error: Error): HttpResposnse => ({
  statusCode: 400,
  body: error,
});
