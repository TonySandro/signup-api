import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../presentation/helpers/validators/validation";
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite";
import { makeSignUpValidation } from "./signup-validation";

jest.mock("../../presentation/helpers/validators/validation-composite");

describe("SignUpValidation Factory", () => {
  test("Should call ValidationComposite with all validations", () => {
    makeSignUpValidation();

    const requiredFields: Validation[] = [];
    for (const field of ["name", "email", "password", "passwordConfirmation"]) {
      requiredFields.push(new RequiredFieldValidation(field));
    }

    expect(ValidationComposite).toHaveBeenCalledWith(requiredFields);
  });
});