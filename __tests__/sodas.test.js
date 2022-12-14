const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('sodas controller', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET /sodas should return a list of sodas', async () => {
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
  it('GET /sodas/1 should return soda details', async () => {
    const resp = await request(app).get('/sodas/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      color: 'Golden',
      country: 'Peru',
      id: '1',
      image:
        'https://m.media-amazon.com/images/I/51slcDKrKDL._SY445_PIbundle-12,TopRight,0,0_SX236SY445SH20_.jpg',
      name: 'Inca Kola',
    });
  });
  it('POST /sodas should create a new soda in the database', async () => {
    const newSoda = {
      name: 'Bahamas Goombay Punch',
      country: 'Bahamas',
      color: 'Yellow',
      image: 'https://i.ebayimg.com/images/g/FPMAAOSwSZNi3m-C/s-l500.jpg',
    };
    const resp = await request(app).post('/sodas').send(newSoda);
    expect(resp.status).toBe(200);
    expect(resp.body).toMatchInlineSnapshot(`
      Object {
        "color": "Yellow",
        "country": "Bahamas",
        "id": "4",
        "image": "https://i.ebayimg.com/images/g/FPMAAOSwSZNi3m-C/s-l500.jpg",
        "name": "Bahamas Goombay Punch",
      }
    `);
  });
  it('PUT /sodas/1 should update soda with id #1', async () => {
    const resp = await request(app).put('/sodas/1').send({ color: 'Yellow' });
    expect(resp.status).toBe(200);
    expect(resp.body.color).toBe('Yellow');
  });

  it('GET /sodas/xyz should return a 404', async () => {
    const resp = await request(app).get('/sodas/456');
    expect(resp.status).toBe(404);
  });

  it('DELETE /sodas/1 should delete soda #1', async () => {
    const resp = await request(app).delete('/sodas/1');
    expect(resp.status).toBe(204);

    const getResp = await request(app).get('/sodas/1');
    expect(getResp.status).toBe(404);
  });

  afterAll(() => {
    pool.end();
  });
});
