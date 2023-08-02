import {Await, Link, NavLink, useMatches} from '@remix-run/react';
import SanityImage from './global/SanityImage';
export function Header({header, isLoggedIn, cart,headerBar}) {
  const {menu, shop} = header.data;
  const {items} = menu;
  console.log(headerBar, 'menumenu');
  return (
    <header className="header">
      <div className='header-logo'>
        <div className='logo'>
          <Link to={"/"}>
          <SanityImage     src={headerBar.siteLogo.desk_logo.asset._ref}/>
          </Link>
        </div>
      </div>
      <nav className="header-menu ">
        <ul className="header-menu-list flex items-center justify-center mt-6 mb-5">
          {items?.map((navItem) => {
            if (!navItem.url) return null;
            const url = navItem.url.replace(shop.primaryDomain.url, '');
            return (
              <l1 key={navItem.id} className="nav-parent relative cursor-pointer">
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
    </header>
  );
}
function ChildNav({childNavItems, shopUrl}) {
  return (
    <div className="child-nav absolute w-52 min-w-full  bg-white z-10">
      <ul className='py-2 px-4'>
        {childNavItems.map((item) => {
          const url = item.url.replace(shopUrl, '');
          return (
            <li key={item.id} className='py-1'>
              <Link to={url} className='text-base text-accent'>- {item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
