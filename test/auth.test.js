import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/config/firebase.js", async () => ({
  default: (await import("./mocks/firestore.mock.js")).firestore
}));

const { default: app } = await import("../src/app.js");


import request from "supertest";

describe("Auth Service", () => {
  describe("User Registration", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Gabriel",
        email: "gabriel@jest.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("message", "Usuário registrado com sucesso");
    });

    it("should not register an existing user", async () => {
      await request(app).post("/auth/register").send({
        name: "Gabriel",
        email: "gabriel@jest.com",
        password: "123456",
      });

      const res = await request(app).post("/auth/register").send({
        name: "Gabriel",
        email: "gabriel@jest.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error", "Usuario já existe");

    });
  });

  describe("User Login", () => {
    it("should login a registered user", async () => {
      await request(app).post("/auth/register").send({
        name: "Gabriel",
        email: "gabriel@jest.com",
        password: "123456",
      });

      const res = await request(app).post("/auth/login").send({
        email: "gabriel@jest.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should not login with invalid password", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "gabriel@jest.com",
        password: "errorpass",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error", "Email ou senha inválida");
    });

    it("should not login with invalid email", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "errortest@jest.com",
        password: "123456",
      });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("error", "Email ou senha inválida");
    });
  });
});
