const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST /auth/logout", () => {
  it("should return status 200", (done) => {
    chai
      .request(app)
      .post("/auth/logout")
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
