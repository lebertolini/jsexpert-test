const { describe, it } = require('mocha')
const request = require('supertest')
const app = require('./api')
const assert = require('assert')

describe('API Suite test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200)
      assert.deepStrictEqual(response.text, 'contact us page')
    })
  })
  describe('/notExistentRoute', () => {
    it('should an inexistent route and return error message', async () => {
      const response = await request(app)
        .get('/notExistentRoute')
        .expect(200)
      assert.deepStrictEqual(response.text, 'Route not found!')
    })
  })
  describe('/login', () => {
    it('should login sucessfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'Lebertolini', password: '123' })
        .expect(200)
      assert.deepStrictEqual(response.text, 'Logging has succeeded!')
    })
    it('should unauthorize a request when requesting it using wrong credentials and return HTTP status 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'bertolinile', password: '321' })
        .expect(401)
      assert.ok(response.unauthorized)
      assert.deepStrictEqual(response.text, 'Logging failed!')
    })
  })
})
