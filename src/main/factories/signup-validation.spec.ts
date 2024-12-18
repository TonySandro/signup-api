import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validation";
import { EmailValidation } from "../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../presentation/helpers/validators/validation";
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite";
import { EmailValidator } from "../../presentation/protocols/email-validator";
import { makeSignUpValidation } from "./signup-validation";

jest.mock("../../presentation/helpers/validators/validation-composite");

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe("SignUpValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeSignUpValidation();

    const requiredFields: Validation[] = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      requiredFields.push(new RequiredFieldValidation(field));
    }

    requiredFields.push(
      new CompareFieldsValidation("password", "passwordConfirmation")
    );
    requiredFields.push(new EmailValidation("email", makeEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(requiredFields);
  });
});
