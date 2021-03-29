const request = require('supertest');
const app = require('../../src/app');


const mail = `${Date.now()}@mail.com`;


test('Deve listar todos os usuários', () => {
  return request(app).get('/users').then((res) => {
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  })
});

test('Deve registrar o usuário', () => {
  return request(app).post('/users')
    .send({ name: 'Sinara', mail: mail, passwd: '12356' })
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Sinara')
    })
});

test('Deve retornar id de usuário', () => {
  return request(app).post('/users')
    .send({ name: 'Italo', mail: `${Date.now()}1@mail.com`, passwd: '12356' })
    .then(res => {
      expect(res.status).toBe(201);
      expect(res.body.id).toBeGreaterThan(0);
    })
});

test('Não deve registrar usuário sem nome', () => {
  return request(app).post('/users')
    .send({ mail: 'test@gmail.com', passwd: '12356' })
    .then(res => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Name is required')
    })

});

test('Não deve registrar usuário sem email', async () => {
  const result = await request(app).post('/users').send({ name: 'Italo', passwd: '12356' });
  expect(result.status).toBe(400);
  expect(result.body.error).toBe('Mail is required');
});

test('Não deve registrar usuário sem senha', (done) => {
  const mail = `${Date.now()}@mail.com`;
  request(app).post('/users')
    .send({ name: 'Italo', mail })
    .then(res => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Password is required');
      done();
    })
});

test('Não deve registrar usuário com email existente', () => {
  return request(app).post('/users')
    .send({ name: 'Italo', mail: mail, passwd: '12356' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Usuário existente')
    })
});