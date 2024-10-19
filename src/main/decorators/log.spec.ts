import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../../presentation/protocols";
import { LogControllerDecorator } from "./log";

describe("Log Controller Decorator", () => {
  test("Should call controller handle", async () => {
    class ControllerStub implements Controller {
      async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {
            name: "Test",
          },
        };

        return new Promise((resolve) => resolve(httpResponse));
      }
    }

    const controllerStub = new ControllerStub();
    const handleSpy = jest.spyOn(controllerStub, "handle");
    const sut = new LogControllerDecorator(controllerStub);

    const httpRequest = {
      body: {
        name: "valid_name",
        email: "valid_email",
        password: "valid_password",
        passwordConfirmation: "valid_passwordConfirmation",
      },
    };

    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
