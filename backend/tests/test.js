const server = require('../app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

describe('Hashtags Endpoints', () => {

    it('GET /Hashtags should show all users', async () => {
      const res = await requestWithSupertest.get('api/V1/hashtags/getHashtags');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
       // expect(res.body).toHaveProperty('users')
    });
  
  });