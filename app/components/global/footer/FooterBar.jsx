import {Link} from '@remix-run/react';
import React from 'react';

export default function FooterBar() {
  return (
    <div className="footer-bar bg-color_beige py-4 max-md:py-3">
      <div className="container mx-auto">
        <div className="footer-bar-nav flex flex-wrap items-center max-md:justify-center justify-start gap-12 max-md:gap-3">
          <Link to={'/'} className="text-primary text-xs font-normal">
            © Pure Fiji 2022
          </Link>
          <Link to={'/'} className="text-primary text-xs font-normal">
            Terms & Conditions
          </Link>
          <Link to={'/'} className="text-primary text-xs font-normal">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
