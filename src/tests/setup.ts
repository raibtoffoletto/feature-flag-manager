import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { configure as configureDom } from '@testing-library/dom';
import { configure as configureReact } from '@testing-library/react';
import handlers from '../msw/handlers';
import { afterAll, afterEach, beforeAll } from 'vitest';

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configureReact({ defaultHidden: true, asyncUtilTimeout: 5000 });
configureDom({ asyncUtilTimeout: 5000 });

process.env.DEBUG_PRINT_LIMIT = '15000';

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(async () => {
  server.resetHandlers();
});

afterAll(() => server.close());
