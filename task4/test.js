const request = require("supertest");
const app = require("./app");

describe("GET / ", () => {
  test("It should respond with 'done'", async () => {
    const response = await request(app).get("/api");
    expect(response.body).toEqual({ msg: "done" });
    expect(response.statusCode).toBe(200);
  });
});
