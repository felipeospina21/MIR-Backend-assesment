const req = require("supertest");
const app = require("../../app");
const { connectDB, disconnect, cleanup } = require("../../config/database");

describe("user", () => {
  // jest.setTimeout(30000);
  beforeAll(async () => {
    await connectDB();
    await cleanup();
  });

  afterEach(async () => {
    await cleanup();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("Should register new user", async () => {
    const body = { email: "test@emailtest.com", password: "1234567890" };
    const res = await req(app).post("/auth/local").send(body);
    expect(res.statusCode).toBe(200);
  });
  test("Should login", async () => {
    const user = { email: "test@emailtest.com", password: "1234567890" };
    await req(app).post("/auth/local").send(user);
    const login = await req(app).post("/auth/local/login").send(user);
    expect(login.statusCode).toBe(200);
  });
});
