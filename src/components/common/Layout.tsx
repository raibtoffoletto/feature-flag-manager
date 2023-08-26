import Topbar from '@components/layout/Topbar';

export default function Layout({ children }: IParent) {
  return (
    <>
      <Topbar />

      {children}
    </>
  );
}
