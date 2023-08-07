import React from 'react'
import SanityImage from '../SanityImage'

export default function FooterIcons({footerIcons}) {
  return (
    <div className='footer-icons max-md:hidden block my-16'>
       <div className='container mx-auto'>
        <div className='footer-icons-wrapper flex items-center justify-between flex-wrap max-lg:gap-x-10 gap-y-4 gap-x-16'>
          {
            footerIcons.map((icon,index)=>{
              return <SanityImage 
              className=""
              noSrcSet={true}
              src={icon.image.asset._ref} 
              alt={icon.altText} 
              key={`footer-icon-${index}`}/>
            })
          }
        </div>
        </div> 
    </div>
  )
}
