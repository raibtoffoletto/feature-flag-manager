type IParent<T extends object = object> = T & { children?: React.ReactNode };

type EnvironmentFlag = Environment & {
  exists: boolean;
  value: string;
};
