import { Link } from "@remix-run/react";
import NewsLater from "../NewsLater";
import FooterSocialIcons from "./FooterSocialIcons";

export default function FooterDeskNavs({menu,primaryDomain,socialMedia}) {
  return (
    <div className='footer-navigation flex items-start w-full   max-md:hidden'>
    <div className='footer-navigation-wrapper flex items-start w-1/2'>
    {
    menu.map((navItem)=>{
      return <div className='footer-nav w-1/3' key={navItem.id}>
            <p className='text-sm font-normal text-primary uppercase mb-5'>{navItem.title}</p>
            {
              navItem?.items?.length > 0 && <ul>
              {
                navItem?.items.map((childNav)=>{
                  const url = childNav.url.replace(primaryDomain, '');
                  return<li key={childNav.id} className='text-xs text-accent font-normal mb-3'><Link to={url || "#"} >{childNav.title}</Link></li>
                })
              }
              </ul>  
            }
      </div>
    })
   }
    </div>
    <div className='footer-support-newslatter w-1/2 flex items-start'>
    <div className='footer-support-wrapper w-1/2'>
      <div className='footer-nav'>
       <p className='text-sm font-normal text-primary uppercase mb-5'>support</p>
       <p className='text-xs text-accent font-normal mb-3'>Need help? Call us at <span>(800) 477 4283</span></p>
       <p className='text-xs text-accent font-normal mb-3'>Mon - Fri 9:30 - 5:00pm MDT</p>
    <FooterSocialIcons socialMedia={socialMedia}/>
      </div>
   </div>
   <div className='footer-newslatter w-1/2'>
    <NewsLater/>
   </div>
    </div>
  </div>
  )
}
