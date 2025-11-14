import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/config/firebase.js", async () => ({
  default: (await import("./mocks/firestore.mock.js")).firestore
}));

jest.unstable_mockModule("../src/config/omdbApi.js", async () => ({
  default: (await import("./mocks/omdb.mock.js")).default
}));

const { default: app } = await import("../src/app.js");

import request from "supertest";
import { firestore } from "./mocks/firestore.mock.js";
import { generateTestToken } from "./utils/test.helpers.js";

const token = generateTestToken();

describe("Movies API", () => {

  beforeEach(() => {
    firestore.data = {};
  });

  it("should return an empty movie list", async () => {
    const res = await request(app).get("/movies");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should create a new movie", async () => {
    const res = await request(app)
      .post("/movies")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Movie",
        description: "Test",
        releaseYear: 2024
      });

    expect(res.body).toHaveProperty("message", "Filme cadastrado com sucesso");
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("title", "Test Movie");
  });

  it("should block duplicate movies", async () => {
    await firestore.collection("movies").doc("Test Movie").set({
      title: "Test Movie"
    });

    const res = await request(app)
      .post("/movies")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Movie",
        description: "Desc",
        releaseYear: 2024
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Filme já cadastrado");
  });

  it("should return a movie by ID", async () => {
    await firestore.collection("movies").doc("TDW123").set({
      title: "Mock Movie"
    });

    const res = await request(app).get("/movies/TDW123");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", "TDW123");
  });

  it("should return 404 if movie not found", async () => {
    const res = await request(app).get("/movies/TDWERROR");

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Filme não encontrado");
  });

  it("should update an existing movie", async () => {
    await firestore.collection("movies").doc("ToUpdate").set({
      title: "Triisney new Title",
      description: "Up Desc"
    });

    const res = await request(app)
      .put("/movies/ToUpdate")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "New Desc"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Filme atualizado com sucesso");
    expect(res.body.description).toBe("New Desc");
  });

  it("should return 404 on update missing movie", async () => {
    const res = await request(app)
      .put("/movies/NotExist")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "ABC"
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Filme não encontrado");
  });

  it("should delete an existing movie", async () => {
    await firestore.collection("movies").doc("Triisney-Code-Hard").set({
      title: "Triisney-Code-Hard"
    });

    const res = await request(app)
      .delete("/movies/Triisney-Code-Hard")
      .set("Authorization", `Bearer ${token}`);

    expect(res.body).toHaveProperty("message", "Filme deletado com sucesso!");
    expect(res.statusCode).toBe(200);
  });

  it("should return 404 when deleting missing movie", async () => {
    const res = await request(app)
      .delete("/movies/Code Easy")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error", "Filme não encontrado");
  });
});
