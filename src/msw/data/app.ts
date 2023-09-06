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
