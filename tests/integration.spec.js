const { connectDB, dropDB, dropCollections } = require('../src/setuptestdb')
const { ERROR_MSG } = require('../build/src/constants')

const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-http'))
const { app } = require('../build/src/app')

beforeAll(async () => {
  await connectDB()
})

afterEach(async () => {
  //await dropCollections()
})

afterAll(async () => {
  await dropDB()
})

describe('/users', () => {
  it('Creates a user', function () {
    return chai
      .request(app)
      .post('/users')
      .send({ username: 'assdcder', password: 'hithere', name: 'name' })
      .then(function (res) {
        expect(res).to.have.status(201)
      })
  })

  it('fails, to create a user if username exists', function () {
    return chai
      .request(app)
      .post('/users')
      .send({ username: 'assdcder', password: 'hithere', name: 'name' })
      .then(function (res) {
        expect(res).to.have.status(400)
        expect(res.body.reason).to.equal(ERROR_MSG.USERNAME_NOT_AVAILABLE)
      })
  })
})
