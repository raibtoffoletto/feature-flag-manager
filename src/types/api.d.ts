type Tenant = {
  id: string;
  name: string;
};

type User = {
  name: string;
  tenants: Tenant[];
};

type Environment = {
  id: number;
  name: string;
  url: string;
};

type Settings = {
  environments: Environment[];
  endpoint: string;
};

type Flag = {
  key: string;
  valueType: 'string' | 'boolean';
  validation?: string;
};
