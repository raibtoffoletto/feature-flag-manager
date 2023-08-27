import { configure as configureDom } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { configure as configureReact } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import server from './server';

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configureReact({ defaultHidden: true, asyncUtilTimeout: 5000 });
configureDom({ asyncUtilTimeout: 5000 });

process.env.DEBUG_PRINT_LIMIT = '15000';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(async () => {
  server.resetHandlers();
});

afterAll(() => server.close());
