
import {Header} from '~/components/Header';

export function Layout({cart, children = null, footer, header, isLoggedIn,headerBar}) {
    return (
    <>
      <Header header={header} cart={cart} isLoggedIn={isLoggedIn} headerBar={headerBar} />
      <main id="MainContent">{children}</main>
    </>
  );
}




