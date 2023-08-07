import HeaderBar from './HeaderBar';
import { HeaderDesktop } from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
export function Header(props) {
  const {header}=props
  return (
    <header className="header">
    {
      header?.headerBar?.title && <HeaderBar title={header?.headerBar?.title} url={header?.headerBar?.url}/>
    }
    <HeaderDesktop {...props}/>
    <HeaderMobile {...props}/>
   </header>
  );
}

