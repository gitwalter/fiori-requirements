const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("./server");
// Configure chai
chai.use(chaiHttp);
chai.should();

let app = null;

before((done) => {
    server.then((result) => {
        app = result;
        done();
    });
});

describe("GET /requirements-service/Requirements", () => {
    it("+ should return a list of requirements", (done) => {
        chai.request(app)
            .get("/requirements-service/Requirements")
            .set("Authorization", "Basic alice:")
            .end((error, response) => {
                try {
                    response.should.have.status(200);
                    response.body.value.should.be.an("array");
                    done();
                } catch (error) {
                    done(error);
                }
            });
    });


    it('should create a requirement', (done) => {
        chai.request(app)
            .post("/requirements-service/Requirements")
            .set('content-type', 'application/json;IEEE754Compatible=true')
            .set("Authorization", "Basic alice:")
            .send({
                problem: "the sun is not shining",
                app: "sun app",
                description: "I miss the sun",
                solution: "ask Mr. Kachelmann for more information",
                user: "Sunnyboy"
            })
            .end((error, response) => {
                try {
                    response.should.have.status(201);
                    done();
                } catch (error) {
                    done(error);
                }
            });

    });
});