import { HttpRequest, HttpResposnse } from "./http";

export interface Controller {
  handle(httpRequest: HttpRequest): HttpResposnse;
}
