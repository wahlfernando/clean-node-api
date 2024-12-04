import test, { describe } from "node:test";
import { SingUpController } from "./singup";
import { MissisgParamError } from "../erros/missing-parans-error";
import { InvalidParamError } from "../erros/invalid-parans-error";
import { EmailValdiator } from "../protocols/email-validator";

interface StubTypes {
  sut: SingUpController;
  emailValdiatorStub: EmailValdiator;
}

const makeSut = (): StubTypes => {
  class EmailValdiatorStub implements EmailValdiator {
    isValid(email: string): boolean {
      return true;
    }
  }
  const emailValdiatorStub = new EmailValdiatorStub();
  const sut = new SingUpController(emailValdiatorStub);
  return {
    sut,
    emailValdiatorStub,
  };
};

describe("SingUp COntroller", () => {
  it("Shold return 400 if not name is provided", () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email@gmail.com",
        password: "any_password",
        passwordConfirmatrion: "any_password",
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissisgParamError("name"));
  });
});

test("Should return 400 if no email is provided", () => {
  const { sut } = makeSut();
  const httpRequest = {
    body: {
      name: "any_name",
      password: "any_password",
      passwordConfirmatrion: "any_password",
    },
  };
  const httpResponse = sut.handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(new MissisgParamError("email"));
});

test("Should return 400 if no password is provided", () => {
  const { sut } = makeSut();
  const httpRequest = {
    body: {
      name: "any_name",
      email: "any_email@gmail.com",
      passwordConfirmatrion: "any_password",
    },
  };
  const httpResponse = sut.handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(new MissisgParamError("password"));
});

test("Should return 400 if no passwordConfirmatrion is provided", () => {
  const { sut } = makeSut();
  const httpRequest = {
    body: {
      name: "any_name",
      email: "any_email@gmail.com",
      password: "any_password",
    },
  };
  const httpResponse = sut.handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(
    new MissisgParamError("passwordConfirmatrion")
  );
});

test("Should return 400 if invalid email is provided", () => {
  const { sut, emailValdiatorStub } = makeSut();
  jest.spyOn(emailValdiatorStub, "isValid").mockReturnValueOnce(false);
  const httpRequest = {
    body: {
      name: "any_name",
      email: "invalid_email@gmail.com",
      password: "any_password",
      passwordConfirmatrion: "any_password",
    },
  };
  const httpResponse = sut.handle(httpRequest);
  expect(httpResponse.statusCode).toBe(400);
  expect(httpResponse.body).toEqual(new InvalidParamError("invalidEmail"));
});
