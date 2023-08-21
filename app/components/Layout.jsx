import {Header} from '~/components/global/header/Header';
import {Footer} from './global/footer/Footer';
import {Suspense} from 'react';
import {Await} from '@remix-run/react';

export function Layout({
  cart,
  children = null,
  header,
  isLoggedIn,
  headerBar,
  siteFooter,
}) {
  return (
    <>
      <Header
        header={header}
        cart={cart}
        isLoggedIn={isLoggedIn}
        headerBar={headerBar}
      />
      <main id="MainContent">{children}</main>
      <Suspense>
        <Await resolve={siteFooter}>
          {(siteFooter) => {
            const [{socialMedia, footerIcons}, {data}] = siteFooter;
            const {menu, shop} = data;
            return (
              <Footer
                menu={menu?.items}
                footerIcons={footerIcons}
                socialMedia={socialMedia}
                primaryDomain={shop?.primaryDomain?.url}
              />
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
