import { NewsLaterMobSubmitBtn } from "./Icons";

export default function NewsLater() {
  return (
    <div className='newslatter-wrapper'>
      <p className='text-sm  max-md:font-medium font-normal text-primary uppercase mb-5'>Never Miss a Deal Again</p>
      <p className='text-xs text-accent font-normal mb-3'>Subscribe to our email list and get 15% off your first order.</p>
       <div className='input-wrapper flex relative'>
        <input type='email' className=' focus-visible:border-newlatter_border_color focus-visible:border placeholder-primary text-primary py-[14px] w-full px-5 border border-solid border-newlatter_border_color m-0 font-normal text-sm' placeholder='Enter your email...' />
        <button className='   max-md:hidden block py-4 px-5 bg-blue text-sm font-medium uppercase text-white'>Submit</button>
        <NewsLaterMobSubmitBtn className="max-md:block hidden  absolute top-1/2 -translate-y-1/2 right-4"/>
       </div>
    </div>
  )
}
