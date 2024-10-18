import request from "supertest";
import app from "../config/app";

describe("Sign Up Routes Middleware", () => {
  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Tony",
        email: "tonysduarte@gmail.com",
        password: "112233",
        passwordConfirmation: "112233",
      })
      .expect(200);
  });
});
