import {Link} from '@remix-run/react';
import {CloseIcon, MinusIcon, PlusIcon, SearchIcon} from '../Icons';
import {useState} from 'react';

export default function HeaderMobileDrawer({
  onCloseMobileDrawer,
  primaryDomainUrl,
  mobileNavItems,
  drawerAnimation,
  onDrawerAnimationEnd,
}) {
  const [showChildDrawerNav, setShowChildDrawerNav] = useState(null);
  const toggleChildNavDrawer = (id) => {
    if (showChildDrawerNav == id) {
      setShowChildDrawerNav(null);
    } else {
      setShowChildDrawerNav(id);
    }
  };
  return (
    <div className="mobile-drawer hidden max-md:block">
      <div className="mobile-drawer-backdrop bg-mobile_backDrop_color fixed w-full h-full top-8 left-0"></div>
      <div
        className={`mobile-drawer px-8 py-5 fixed w-[85%] h-full top-8 left-0 z-20 bg-white overflow-y-auto  ${
          drawerAnimation ? 'animate-fade_In_Left' : 'animate-fade_Out_Left'
        }`}
        onAnimationEnd={() => {
          !drawerAnimation && onDrawerAnimationEnd();
        }}
      >
        <div className="mobile-drawer-header flex items-center justify-between">
          <div
            className="close-icon cursor-pointer"
            onClick={onCloseMobileDrawer}
          >
            <CloseIcon />
          </div>
          <div className="search-icon cursor-pointer">
            <SearchIcon />
          </div>
        </div>
        <div className="mobile-drawer-navigation pt-7">
          <ul>
            {mobileNavItems.map((navItem) => {
              const url = navItem.url.replace(primaryDomainUrl, '');
              return (
                <li className="mb-7" key={navItem.id}>
                  <div className="nav-wrapper flex items-center justify-between">
                    <Link
                      to={url}
                      key={navItem.id}
                      className="font-normal text-black text-base"
                    >
                      {navItem.title}
                    </Link>{' '}
                    {navItem.items?.length > 0 &&
                    showChildDrawerNav == navItem.id ? (
                      <MinusIcon
                        onClick={() => toggleChildNavDrawer(navItem.id)}
                      />
                    ) : navItem.items?.length > 0 ? (
                      <PlusIcon
                        onClick={() => toggleChildNavDrawer(navItem.id)}
                      />
                    ) : null}
                  </div>
                  <DrwawerChildNavs
                    primaryDomainUrl={primaryDomainUrl}
                    showChildDrawerNav={
                      navItem.items?.length > 0 &&
                      showChildDrawerNav == navItem.id
                    }
                    childNavs={navItem.items}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
function DrwawerChildNavs({childNavs, showChildDrawerNav, primaryDomainUrl}) {
  return (
    <>
      {showChildDrawerNav && (
        <ul className="pt-7 pb-3 px-1 -mb-[27px]">
          {childNavs.map((item) => {
            const url = item.url.replace(primaryDomainUrl, '');
            return (
              <li
                key={item.id}
                className="mb-[14px] text-base font-normal tetx-accent last:mb-0"
              >
                <Link to={url}>{item.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
