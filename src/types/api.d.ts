interface Tenant {
  id: string;
  name: string;
}

interface User {
  name: string;
  tenants: Tenant[];
}
