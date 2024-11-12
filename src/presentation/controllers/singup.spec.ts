import { describe } from "node:test"
import { SingUpController } from "./singup"

describe('SingUp COntroller', () => {
  it('Shold return 400 if not name is provided', () => {
    const sut = new SingUpController()
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmatrion: 'any_password',
      }
    }
    const httpResposnse = sut.handle(httpRequest)
    expect(httpResposnse.statusCode).toBe(400)
  })
})