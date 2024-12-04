import test, { describe } from "node:test";
import { SingUpController } from "./singup";
import { MissisgParamError } from "../erros/missing-parans-error";

describe("SingUp COntroller", () => {
  it("Shold return 400 if not name is provided", () => {
    const sut = new SingUpController();
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
  const sut = new SingUpController();
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
  const sut = new SingUpController();
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
  const sut = new SingUpController();
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
