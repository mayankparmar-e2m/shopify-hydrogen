import React from 'react'
import { FacebookIcon, InstagramIcon, Pintrest } from '../Icons'
import { Link } from '@remix-run/react'

export default function FooterSocialIcons({socialMedia}) {
  return (
    <div className='social-media mt-5'>
        <ul className='flex items-center max-md:justify-center gap-5'>
          {
            socialMedia?.instagram && <li><Link to={socialMedia?.instagram }><InstagramIcon/></Link></li>
          }
          {
            socialMedia?.facebook && <li><Link to={socialMedia?.facebook }><FacebookIcon/></Link></li>
          }
          {
            socialMedia?.pinterest && <li><Link to={socialMedia?.pinterest }><Pintrest/></Link></li>
          }
           {
            socialMedia?.youtube && <li><Link to={socialMedia?.youtube }><InstagramIcon/></Link></li>
          }
        </ul>
       </div>
  )
}
