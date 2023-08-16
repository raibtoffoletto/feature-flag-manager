import '@testing-library/jest-dom';
import { configure as configureDom } from '@testing-library/dom';
import { configure as configureReact } from '@testing-library/react';

// speeds up *ByRole queries a bit
// https://github.com/testing-library/dom-testing-library/issues/552
configureReact({ defaultHidden: true, asyncUtilTimeout: 5000 });
configureDom({ asyncUtilTimeout: 5000 });
