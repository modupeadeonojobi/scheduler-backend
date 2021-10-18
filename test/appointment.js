//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const Appointment = require('../models/appointment');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const server = require('../server');
const chaiHttp = require('chai-http');



chai.use(chaiHttp);


beforeEach((done) => {
  Appointment.deleteMany({}, function (err) { });
  // User.deleteMany({}, function (err) { });
  done();
});

afterEach((done) => {
  // User.deleteMany({}, function (err) { });
  Appointment.deleteMany({}, function (err) { });
  done();
});

describe('FIRST VALUE', () => {
  it('test default API welcome route...', (done) => {

    chai.request(server)
      .get('/api/welcome')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        const actualVal = res.body.message;
        expect(actualVal).to.be.equal('Route not found');
        done();
      });
  });


  it('should verify that we have 0 products in the DB', (done) => {
    chai.request(server)
      .get('/api/appointments')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  }).timeout(10000)
})