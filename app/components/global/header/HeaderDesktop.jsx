import {Await, Link, NavLink, useMatches} from '@remix-run/react';
import SanityImage from '../SanityImage';
import {AccountIcon, SearchIcon, CartIcon} from '../Icons';
export function HeaderDesktop({header, isLoggedIn, cart}) {
  const {menu, shop} = header.data;
  const {items} = menu;
  return (
    <div className="disk-header-wrapper block  max-md:hidden">
      <div className="container mx-auto">
        <div className="header-logo flex items-center w-full mt-5">
          <div className="logo  max-w-[120px] w-1/2 ml-auto -mr-[60px]">
            <Link to={'/'}>
              <SanityImage src={header.siteLogo.desk_logo.asset._ref} />
            </Link>
          </div>
          <div className="header-icon-wrapper flex items-center w-1/2 justify-end">
            <div className="search-icon cursor-pointer">
              <SearchIcon />
            </div>
            <div className="account-icon cursor-pointer mx-9">
              <AccountIcon />
            </div>
            <div className="cart-icon cursor-pointer">
              <CartIcon />
            </div>
          </div>
        </div>
        <nav className="header-menu ">
          <ul className="header-menu-list flex items-center justify-center mt-6 mb-2">
            {items?.map((navItem) => {
              if (!navItem.url) return null;
              const url = navItem.url.replace(shop.primaryDomain.url, '');
              return (
                <l1
                  key={navItem.id}
                  className="nav-parent relative cursor-pointer"
                >
                  <NavLink
                    end
                    prefetch="intent"
                    to={url}
                    className={
                      'nav-link px-4 uppercase text-accent  text-sm font-normal '
                    }
                  >
                    {navItem.title}
                  </NavLink>
                  {navItem?.items?.length > 0 && (
                    <ChildNav
                      childNavItems={navItem.items}
                      shopUrl={shop.primaryDomain.url}
                    />
                  )}
                </l1>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
function ChildNav({childNavItems, shopUrl}) {
  return (
    <div className="child-nav absolute w-52 min-w-full  bg-white z-10">
      <ul className="py-2 px-4">
        {childNavItems.map((item) => {
          const url = item.url.replace(shopUrl, '');
          return (
            <li key={item.id} className="py-1">
              <Link to={url} className="text-base text-accent">
                - {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
