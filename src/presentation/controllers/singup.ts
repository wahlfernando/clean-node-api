import { HttpRequest, HttpResposnse } from "../protocols/http";
import { MissisgParamError } from "../erros/missing-parans-error";
import { InvalidParamError } from "../erros/invalid-parans-error";
import { badRequest } from "../helpers/http-helper";
import { Controller } from "../protocols/controllers";
import { EmailValdiator } from "../protocols/email-validator";
import { ServerError } from "../erros/server-error";
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
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
