import FooterBar from './FooterBar';
import FooterDeskNavs from './FooterDeskNavs';
import FooterIcons from './FooterIcons';
import FooterMobileNavs from './FooterMobileNavs';

export function Footer({menu, primaryDomain, socialMedia, footerIcons}) {
  return (
    <footer className="footer">
      <div className="container mx-auto  max-md:py-0 pt-24">
        <FooterDeskNavs
          menu={menu}
          primaryDomain={primaryDomain}
          socialMedia={socialMedia}
        />
        <FooterMobileNavs
          menu={menu}
          primaryDomain={primaryDomain}
          socialMedia={socialMedia}
        />
      </div>
      <FooterIcons footerIcons={footerIcons} />
      <FooterBar />
    </footer>
  );
}
