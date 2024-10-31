import { CompareFildsValidation } from "../../presentation/helpers/validators/compare-fields-validation";
import { RequiredFieldValidation } from "../../presentation/helpers/validators/required-field-validation";
import { Validation } from "../../presentation/helpers/validators/validation";
import { ValidationComposite } from "./../../presentation/helpers/validators/validation-composite";

export const makeSignUpValidation = (): ValidationComposite => {
  const requiredFields: Validation[] = [];
  for (const field of ["name", "email", "password", "passwordConfirmation"]) {
    requiredFields.push(new RequiredFieldValidation(field));
  }

  requiredFields.push(
    new CompareFildsValidation("password", "passwordConfirmation")
  );

  return new ValidationComposite(requiredFields);
};
