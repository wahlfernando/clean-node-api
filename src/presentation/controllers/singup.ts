import { HttpRequest, HttpResposnse } from "../protocols/http";
import { MissisgParamError } from "../erros/missing-parans-error";
import { badRequest } from "../helpers/http-helper";

export class SingUpController {
  handle(httpRequest: HttpRequest): HttpResposnse {
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
  }
}
