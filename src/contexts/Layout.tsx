import Topbar from '@components/layout/Topbar';

export function LayoutProvider({ children }: IParent) {
  return (
    <>
      <Topbar />

      {children}
    </>
  );
}
