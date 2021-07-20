import http, { Server } from 'http';

import HttpStatus from 'http-status-codes';
import request from 'supertest';

import makeApp from '../app';

describe('Health Endpoint', () => {
  const baseEndpoint = '/api/1.0/health';

  let server: Server;

  beforeAll(async (done) => {
    const app = await makeApp();

    server = http.createServer(app);
    server.listen(done);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/health/live', () => {
    it('should return 200 OK', async () => {
      const res = await request(server).get(`${baseEndpoint}/live`);
      expect(res.status).toEqual(HttpStatus.OK);
    });
  });

  describe('GET /api/health/ready', () => {
    it('should return 200 OK', async () => {
      const res = await request(server).get(`${baseEndpoint}/ready`);
      expect(res.status).toEqual(HttpStatus.OK);
    });
  });
});
