import { HttpRequest, HttpResposnse } from "../protocols/http";
import { MissisgParamError } from "../erros/missing-parans-error";
import { badRequest } from "../helpers/http-helper";

export class SingUpController {
  handle(httpRequest: HttpRequest): HttpResposnse {
    if (!httpRequest.body.name) {
      return badRequest(new MissisgParamError("name"));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissisgParamError("email"));
    }
  }
}
