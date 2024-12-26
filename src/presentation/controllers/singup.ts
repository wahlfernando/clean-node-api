import {
  HttpRequest,
  HttpResposnse,
  Controller,
  EmailValdiator,
} from "../protocols";
import { MissisgParamError, InvalidParamError } from "../erros";
import { badRequest } from "../helpers/http-helper";
import { serverError } from "../helpers/http-helper";
export class SingUpController implements Controller {
  private readonly emailValdiator: EmailValdiator;

  constructor(emailValdiator: EmailValdiator) {
    this.emailValdiator = emailValdiator;
  }

  handle(httpRequest: HttpRequest): HttpResposnse {
    try {
      const requiredFields = [
        "name",
        "email",
        "password",
        "passwordConfirmatrion",
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissisgParamError(field));
        }
      }

      const isValid = this.emailValdiator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }
    } catch (error) {
      return serverError();
    }
  }
}
