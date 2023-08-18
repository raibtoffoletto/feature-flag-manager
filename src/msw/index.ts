import { setupWorker } from 'msw';
import handlers from './handlers';

const sw = setupWorker(...handlers);

export default sw;
