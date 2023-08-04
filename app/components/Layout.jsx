
import {Header} from '~/components/global/Header';

export function Layout({cart, children = null, footer, header, isLoggedIn,headerBar}) {
    return (
    <>
      <Header header={header} cart={cart} isLoggedIn={isLoggedIn} headerBar={headerBar} />
      <main id="MainContent">{children}</main>
    </>
  );
}




