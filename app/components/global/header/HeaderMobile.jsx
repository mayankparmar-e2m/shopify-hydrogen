import {Link, useHref} from '@remix-run/react';
import {CartIcon, MobileDrawerIcon} from '../Icons';
import SanityImage from '../SanityImage';
import {useEffect, useState} from 'react';
import HeaderMobileDrawer from './HeaderMobileDrawer';
import {overFlowHidden} from '~/utils/utils';

export default function HeaderMobile({header, isLoggedIn, cart}) {
  const siteUrl = useHref();
  const [drawerAnimation, setDrwaerAnimation] = useState(false);
  const [showMobileDrawer, setMobileDrawer] = useState(false);
  const {menu, shop} = header.data;
  const {items: mobileNavItems} = menu;
  const primaryDomainUrl = shop?.primaryDomain?.url;
  const showSideMobileDrawer = () => {
    overFlowHidden('body', true);
    setMobileDrawer(true);
    setDrwaerAnimation((prevState) => {
      return !prevState;
    });
  };
  const toggleDrwaderAnimation = () => {
    setDrwaerAnimation((prevState) => {
      return !prevState;
    });
  };
  const closeSideMobileDrawer = () => {
    overFlowHidden('body', false);
    setMobileDrawer(false);
  };
  useEffect(() => {
    if (showMobileDrawer) {
      closeSideMobileDrawer();
    }
  }, [siteUrl]);
  return (
    <>
      <div className="mobile-header px-6 pt-3 pb-6 hidden max-md:flex max-md:items-center max-md:justify-between">
        <div className="mobile-drawer-icon" onClick={showSideMobileDrawer}>
          <MobileDrawerIcon />
        </div>
        <div className="site-logo max-w-[80px] w-full">
          <Link to={'/'}>
            <SanityImage src={header.siteLogo.mobile_logo.asset._ref} />
          </Link>
        </div>
        <div className="cart-icon cursor-pointer">
          <CartIcon />
        </div>
      </div>
      {showMobileDrawer && (
        <HeaderMobileDrawer
          drawerAnimation={drawerAnimation}
          primaryDomainUrl={primaryDomainUrl}
          onCloseMobileDrawer={toggleDrwaderAnimation}
          onDrawerAnimationEnd={closeSideMobileDrawer}
          showMobileDrawer={showMobileDrawer}
          mobileNavItems={mobileNavItems}
        />
      )}
    </>
  );
}
