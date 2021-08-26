const request = require("supertest");
const Genre = require("../../model/genres.moel");
const User = require("../../model/user.model");
let server;
describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../app");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { genre: "genre1" },
        { genre: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.genre === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.genre === "genre2")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return a genre if valid id is passe", async () => {
      const genre = new Genre({ genre: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("genre", genre.genre);
    });
    it("should return a genre if valid id is passe", async () => {
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
      // expect(res.body).toHaveProperty("genre", genre.genre);
    });
  });

  describe("POST /", () => {
    it("should return 401 if client is not logged in ", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ genre: "genre1" });

      expect(res.status).toBe(401);
    });
    it("should return 400 if genre is less than 5 character ", async () => {
      const token = new User().generateAuthToken();
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ genre: "1" });

      expect(res.status).toBe(400);
    });
  });
});
