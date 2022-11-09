-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS sodas;

CREATE TABLE sodas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  color VARCHAR NOT NULL,
  image VARCHAR NOT NULL
);

INSERT INTO
  sodas (name, country, color, image)
VALUES
  (
    'Inca Kola',
    'Peru',
    'Golden',
    'https://m.media-amazon.com/images/I/51slcDKrKDL._SY445_PIbundle-12,TopRight,0,0_SX236SY445SH20_.jpg'
  ),
  (
    'Irn Bru',
    'Scotland',
    'Orange',
    'https://m.media-amazon.com/images/I/61jZROIca6L._SY445_PIbundle-6,TopRight,0,0_SX311SY445SH20_.jpg'
  ),
  (
    'Faygo Red Pop',
    'United States',
    'Red',
    'https://m.media-amazon.com/images/I/81PHQae4h1S._SX679_.jpg'
  );