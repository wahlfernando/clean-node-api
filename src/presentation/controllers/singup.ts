import {HttpRequest, HttpResposnse} from '../protocols/http'

export class SingUpController{
  handle(httpRequest: HttpRequest): HttpResposnse{
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error("MISSING PARA : name")
      }  
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error("MISSING PARA : email")
      }  
    }
    
  }
}