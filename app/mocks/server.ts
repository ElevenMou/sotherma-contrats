import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { handlers } from './handler';

const server = setupServer(...handlers);

export { server, http, HttpResponse };
