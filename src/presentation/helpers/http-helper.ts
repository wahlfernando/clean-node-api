import { ServerError } from "../erros/server-error";
import { HttpResposnse } from "../protocols/http";

export const badRequest = (error: Error): HttpResposnse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResposnse => ({
  statusCode: 500,
  body: new ServerError(),
});
