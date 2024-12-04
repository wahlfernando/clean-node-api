import {HttpRequest, HttpResposnse} from '../protocols/http'
import { MissisgParamError } from "../erros/missing-parans-error"

export class SingUpController{
  handle(httpRequest: HttpRequest): HttpResposnse{
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissisgParamError("name")
      }  
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissisgParamError("email")
      }  
    }
    
  }
}