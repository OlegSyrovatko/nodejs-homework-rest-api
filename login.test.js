require("dotenv").config();
const mongoose = require("mongoose");
const { DB_TEST_HOST } = process.env;
const testRequest = require("supertest");
const app = require("./app");
const User = require("./models/user");

const testUser = "sirov";
const testEmail = "sirov@gmail.com";
const testPassword = "sirov123456";

describe("login", () => {
  beforeAll(async () => {
    await mongoose
      .connect(DB_TEST_HOST)
      .then(() => {
        console.log("Database connection successful!");
      })
      .catch((error) => {
        console.log(error.message);
      });

    await User.deleteMany;
  });

  it("should login user", async () => {
    await testRequest(app).post("/api/auth/register").send({
      name: testUser,
      email: testEmail,
      password: testPassword,
    });

    const response = await testRequest(app)
      .post("/api/auth/login")
      .send({ email: testEmail, password: testPassword });

    expect(response.statusCode).toBe(200);
    expect(typeof response.body.token).toBe("string");
    expect(response.body.user.email).toBe(testEmail);
    expect(typeof response.body.user.subscription).toBe("string");
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_HOST).then(() => {
      console.log("Database disconnected!");
    });
  });
});
