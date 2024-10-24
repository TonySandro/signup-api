import validator from "validator";
import { EmailValidatorAdapter } from "./email-validator-adapter";

jest.mock("validator", () => ({
  isEmail(): boolean {
    return true;
  },
}));

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter();
};

describe("Email Validator adapter", () => {
  test("Should return false if validator returns false", () => {
    const sut = makeSut();
    jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
    const isValid = sut.isValid("invalid_email");

    expect(isValid).toBe(false);
  });

  test("Should return true if validator returns true", () => {
    const sut = makeSut();
    const isValid = sut.isValid("invalid_email@email.com");

    expect(isValid).toBe(true);
  });

  test("Should call validator with correct email", () => {
    const sut = makeSut();
    const isEmailSpy = jest.spyOn(validator, "isEmail");
    sut.isValid("any_email@email.com");

    expect(isEmailSpy).toHaveBeenCalledWith("any_email@email.com");
  });
});
