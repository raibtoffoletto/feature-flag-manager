import { setupWorker } from 'msw/browser';
import handlers from './handlers';

const sw = setupWorker(...handlers);

export default sw;
