const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';

let user;

beforeAll(async () => {
  const res = await app.services.users.store({ name: 'Italo', mail: `${Date.now()}1@mail.com`, passwd: '554545' });
  user = { ...res[0] };
});

test('Deve inserir uma conta com sucesso', () => {
  return request(app)
    .post(MAIN_ROUTE)
    .send({ name: 'Acc1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc1');
    })
})

test('Deve listar as contas', () => {
  return app.db('accounts')
    .insert({ name: 'Acc1', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    })
})
