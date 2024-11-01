import { MissingParamError } from "../../errors";
import { RequiredFieldValidation } from "./required-field-validation";

const makeSut = () => {
  const sut = new RequiredFieldValidation("field");

  return {
    sut,
  };
};

describe("Required Fields Validation", () => {
  test("Should return a MissingParamError if validation fails", () => {
    const { sut } = makeSut();

    const error = sut.validate({ name: "any_name" });
    expect(error).toEqual(new MissingParamError("field"));
  });
});
