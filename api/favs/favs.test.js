const req = require("supertest");
const app = require("../../app");
const { connectDB, disconnect, cleanup } = require("../../config/database");

describe("favs", () => {
  jest.setTimeout(30000);
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

  test("Should fail creating new fav if not authenticated", async () => {
    const user = { email: "test@emailtest.com", password: "1234567890" };
    await req(app).post("/auth/local").send(user);
    await req(app).post("/auth/local/login").send(user);

    const body = { title: "test", description: "123456789", link: "www.com" };
    const res = await req(app).post("/api/favs").send(body);
    expect(res.statusCode).toBe(401);
  });

  test("Should create new favs", async () => {
    const user = { email: "test@emailtest.com", password: "1234567890" };
    await req(app).post("/auth/local").send(user);
    const {
      body: { token },
    } = await req(app).post("/auth/local/login").send(user);

    const body = { name: "testFav", favs: [{ title: "test", description: "123456789", link: "www.com" }] };
    const res = await req(app).post("/api/favs").send(body).set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("name", "testFav");
  });

  test("Should get all favs", async () => {
    // sign up & sign in
    const user = { email: "test@emailtest.com", password: "1234567890" };
    await req(app).post("/auth/local").send(user);
    const {
      body: { token },
    } = await req(app).post("/auth/local/login").send(user);

    // create favs lists
    const favs1 = { name: "testFav1", favs: [{ title: "test", description: "123456789", link: "www.com" }] };
    const favs2 = { name: "testFav2", favs: [{ title: "test", description: "123456789", link: "www.com" }] };
    await req(app).post("/api/favs").send(favs1).set("Authorization", `Bearer ${token}`);
    await req(app).post("/api/favs").send(favs2).set("Authorization", `Bearer ${token}`);

    // get favs lists
    const res = await req(app).get("/api/favs").set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  test("Should get favs by id", async () => {
    // sign up & sign in
    const user = { email: "test@emailtest.com", password: "1234567890" };
    await req(app).post("/auth/local").send(user);
    const {
      body: { token },
    } = await req(app).post("/auth/local/login").send(user);

    // create favs lists
    const favs1 = { name: "testFav", favs: [{ title: "test", description: "123456789", link: "www.com" }] };
    const {
      body: { _id: favsId },
    } = await req(app).post("/api/favs").send(favs1).set("Authorization", `Bearer ${token}`);

    // get favs lists
    const res = await req(app).get(`/api/favs/${favsId}`).set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test("Should delete favs by id", async () => {
    // sign up & sign in
    const user = { email: "test@emailtest.com", password: "1234567890" };
    await req(app).post("/auth/local").send(user);
    const {
      body: { token },
    } = await req(app).post("/auth/local/login").send(user);

    // create favs lists
    const favs1 = { name: "testFav", favs: [{ title: "test", description: "123456789", link: "www.com" }] };
    const {
      body: { _id: favsId },
    } = await req(app).post("/api/favs").send(favs1).set("Authorization", `Bearer ${token}`);

    // delete favs lists
    const res = await req(app).delete(`/api/favs/${favsId}`).set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    // get list
    const favsList = await req(app).get("/api/favs").set("Authorization", `Bearer ${token}`);
    expect(favsList.body).toHaveLength(0);
  });
});
