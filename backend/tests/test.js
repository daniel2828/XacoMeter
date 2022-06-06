const app = require('../routes/twitterApi');
const request = require('supertest');

const {API_VERSION}  = require("../config.js");

// Fine for basic cases, but may still cause issues:

const {MONGO_DB_URI_TEST} = process.env;
describe('Hashtags Endpoints', () => {
  
    // beforeAll(async () => {
     
    //   //done()
    // })
    
    // afterAll(async () => {
    //   // Closing the DB connection allows Jest to exit successfully.
     
    //   //await server.close();
      
    // })
    it('GET /Hashtags should show all users',  () => {
        console.log(app);
        return request(app).get(`/api/${API_VERSION}/twitter`).set('Accept', 'application/json').expect(200);
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        //expect(res.body).toHaveProperty('users')
    });
  
  });