import test, { describe } from "node:test"
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
    expect(httpResposnse.body).toEqual(new Error("MISSING PARA : name"))
  })
})

test('Should return 400 if no email is provided', () => {
  const sut = new SingUpController()
  const httpRequest = {
    body: {
      name: 'any_name',
      password: 'any_password',
      passwordConfirmatrion: 'any_password', 
    }
  }
  const httpResposnse = sut.handle(httpRequest)
  expect(httpResposnse.statusCode).toBe(400)
  expect(httpResposnse.body).toEqual(new Error("MISSING PARA : email"))
})