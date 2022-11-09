const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('sodas controller', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /sodas should return a list of sodas', async () => {
    const resp = await request(app).get('/sodas');
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Array [
        Object {
          "color": "Golden",
          "country": "Peru",
          "id": "1",
          "image": "https://m.media-amazon.com/images/I/51slcDKrKDL._SY445_PIbundle-12,TopRight,0,0_SX236SY445SH20_.jpg",
          "name": "Inca Kola",
        },
        Object {
          "color": "Orange",
          "country": "Scotland",
          "id": "2",
          "image": "https://m.media-amazon.com/images/I/61jZROIca6L._SY445_PIbundle-6,TopRight,0,0_SX311SY445SH20_.jpg",
          "name": "Irn Bru",
        },
        Object {
          "color": "Red",
          "country": "United States",
          "id": "3",
          "image": "https://m.media-amazon.com/images/I/81PHQae4h1S._SX679_.jpg",
          "name": "Faygo Red Pop",
        },
      ]
    `);
  });
  afterAll(() => {
    pool.end();
  });
});
