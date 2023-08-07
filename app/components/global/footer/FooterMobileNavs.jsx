import { Link } from '@remix-run/react';
import  { useState } from 'react'
import { MinusIcon, PlusIcon } from '../Icons';
import FooterSocialIcons from './FooterSocialIcons';
import NewsLater from '../NewsLater';

export default function FooterMobileNavs({menu,primaryDomain,socialMedia}) {
    const [navId,setNavId]=useState(null);
    const showFooterChildNav=(id)=>{
      setNavId((prevState)=>{
       if(!prevState){
        return id
       }
       if(prevState !== id){
        return id
       }
       return null
      })
    }
  return (
    <div className='footer-mobile-navigation max-md:block hidden'>
        <div className="footer-navigation-wrapper max-md:px-6 max-md:pt-6 max-md:pb-0">
        {
             menu.map((navItem)=>{
      return <div className='footer-nav' key={navItem.id}>
            <div className='nav flex items-center justify-between mb-5'>
            <p className='text-base font-medium text-black uppercase'>{navItem.title}</p>
            <div className='icon' onClick={()=>showFooterChildNav(navItem.id)}>{navId==navItem.id? <MinusIcon/>:<PlusIcon/>}</div>
            </div>            
            {
              (navItem?.items?.length > 0) && (navId==navItem.id) && <ul>
              {
                navItem?.items.map((childNav)=>{
                  const url = childNav.url.replace(primaryDomain, '');
                  return<li key={childNav.id} className='text-base text-accent font-normal mb-3'><Link to={url || "#"} >{childNav.title}</Link></li>
                })
              }
              </ul>  
            }
      </div>
    })
   }
   
  </div>
  <div className='contact-deatils border-x-0 border-y-[1px] text-center border-solid border-[bg-[#E8E8E8]] py-4'>
    <p className=' text-base font-normal '>Call us at <a className='text-primary' href="tel:800-477-4283">(800) 477 4283</a></p> 
    <FooterSocialIcons socialMedia={socialMedia}/>
   </div>
    <div className='news-latter-wrapper p-6'>
      <NewsLater/>
    </div>
    </div>
  )
}
