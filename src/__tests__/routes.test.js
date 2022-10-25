import app from "../utils/app.js";
import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv/config";

describe("Routes", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("Post routes", () => {
    describe("GET /api/v1/post/id", () => {
      it("Should return 200 status code", async () => {
        const id = "";
        const res = await request(app).get(`/api/v1/post/${id}`);
        expect(res.statusCode).toBe(200);
      });
      it("Should return 404 status code for wrong ObjectId", async () => {
        const id = "";
        const res = await request(app).get(`/api/v1/post/${id}`);
        expect(res.statusCode).toBe(404);
      });
    });
  });
  describe("User routes", () => {
    describe("GET /api/v1/user/id", () => {
      it("Should return user with 200 status code", async () => {
        const id = "";
        const res = await request(app).get(`/api/v1/user/${id}`);
        expect(res.statusCode).toBe(200);
      });
    });
  });

  describe("Auth routes", () => {
    describe("POST /api/v1/auth/login", () => {
      it("Should return 500 status for wrong login credentials", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
          email: "emawil2@wp.pl",
          password: "password",
        });
        expect(res.statusCode).toBe(500);
      });
      it("Should login successfully with 200 status code", async () => {
        const res = await request(app).post("/api/v1/auth/login").send({
          email: "emawil2213903@wp.pl",
          password: "password",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.auth).toBeTruthy();
      });
    });
    describe("POST /api/v1/auth/register", () => {
      it("Should create new user", async () => {
        const res = await request(app).post("/api/v1/auth/register").send({
          email: "testemail2@wp.pl",
          password: "testPassword2",
        });
        expect(res.statusCode).toBe(201);
      });
      it("Should return 403 error code for existing email", async () => {
        const res = await request(app).post("/api/v1/auth/register").send({
          email: "testemail@wp.pl",
          password: "testPassword",
        });
        expect(res.statusCode).toBe(403);
      });
    });
  });

  describe("Upload Routes", () => {
    describe("GET /api/v1/upload/image/filename", () => {
      it("Should return image with 200 status code", async () => {
        const filename = "";
        const res = await request(app).get(`/api/v1/upload/image/${filename}`);
        expect(res.statusCode).toBe(200);
      });
      it("Should return 404 status code for not existing file", async () => {
        const filename = "";
        const res = await request(app).get(`/api/v1/upload/image/${filename}`);
        expect(res.statusCode).toBe(404);
      });
    });
  });
  describe("POST /api/v1/post", () => {
    it("Should create a post", async () => {
      const ownerId = "";
      const res = await request(app)
        .post("/api/v1/post")
        .send({
          title: "test title",
          price: 50,
          category: ["Cars"],
          description: "test desc",
          owner: ownerId,
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.data.title).toBe("test title");
    });
  });
});
