const app = require('../server'),
 request = require("supertest"),
 chai = require("chai");
const expect = chai.expect;
describe("GET /random-url", () => {
  it("should return 404", (done) => {
    request(app).get("/reset")
      .expect(404, done);
  });
});
