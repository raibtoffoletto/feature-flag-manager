import { ValueType } from '@constants';

export const environments: Environment[] = Object.freeze([
  {
    id: 1,
    name: 'Test',
    url: 'https://test.my-api.app',
  },
  {
    id: 2,
    name: 'Prod',
    url: 'https://my-api.app',
  },
]) as Environment[];

export const settings: Settings = Object.freeze({
  environments,
  endpoint: '/flags',
});

export const flags: Flag[] = [
  {
    key: 'primaryColor',
    valueType: ValueType.string,
    validation: '^#([0-9a-f]{3}|[0-9a-f]{6})$',
  },
  {
    key: 'allowDarkMode',
    valueType: ValueType.boolean,
  },
];
