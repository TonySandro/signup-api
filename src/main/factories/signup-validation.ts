import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validation";
import { EmailValidation } from "../../presentation/helpers/validators/email-validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../presentation/helpers/validators/validation";
import { EmailValidatorAdapter } from "../adapters/validators/email-validator-adapter";
import { ValidationComposite } from "./../../presentation/helpers/validators/validation-composite";

export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFields: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    requiredFields.push(new RequiredFieldValidation(field));
  }

  requiredFields.push(
    new CompareFieldsValidation("password", "passwordConfirmation")
  );
  requiredFields.push(
    new EmailValidation("email", new EmailValidatorAdapter())
  );

  return new ValidationComposite(requiredFields);
};
