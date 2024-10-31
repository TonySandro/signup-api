import { InvalidParamError } from "../../errors";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http/http-helper";
import {
  Controller,
  HttpRequest,
  HttpResponse,
  EmailValidator,
  AddAccount,
  Validation,
} from "./signup-protocols";

export class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError("email"));
      }

      const account = await this.addAccount.add({ name, email, password });

      return success(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
