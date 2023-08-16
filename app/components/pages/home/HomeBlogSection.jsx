import { Link } from "@remix-run/react";
import { Image } from "@shopify/hydrogen";

export default function HomeBlogSection({section=[]}) {
  
  const {blogSection, data} = Object.assign({},...section);
  console.log(section,"dwdwd")
  const blogs = data.articles.nodes;
  const {subtitle, title} = blogSection;
  return (
    <>
      {(subtitle || title) && (
          <div className="home-blog px-6 py-20 md:px-0">
            <div className="container mx-auto">
             {
                subtitle && <h5 className=" text-center opacity-50 text-primary text-xs font-medium uppercase tracking-wider">{subtitle}</h5>
             }
             {
                title && <h2 className="text-center  text-primary text-3xl font-normal uppercase leading-9 tracking-widest" >{title}</h2>
             }
             <div className="home-blog__wrapper block md:flex md:items-center ms:justify-between md:gap-5">
                {
                    blogs.map((blog)=>{
                        return <div className="blog w-full md:w-[calc(25%-20px)] mb-7 md:mb-0" key={blog.id}>
                            <div className="image mb-6">
                                <Image data={blog.image} aspectRatio="1/1"/>
                                </div>
                                <div className="title mb-3">
                                    <p className=" text-stone-500 text-sm font-normal uppercase leading-snug tracking-widest">{blog.title}</p>
                                </div>
                                <div className="content mb-5">
                                    <p className="clip-string text-neutral-800 text-xs font-normal leading-tight tracking-tight">{blog.content}</p>
                                </div>
                                <Link  to={`blogs/${blog.blog.handle}/${blog.handle}`} className=" border-b border-solid border-neutral-800 pb-2 text-neutral-800 text-xs font-medium uppercase tracking-wider">Read More</Link>
                            </div>
                    })
                }
             </div>
             <Link to={'/blogs'} className="mt-6 md:mt-16 max-w-[223px] w-full mx-auto h-12 px-7 py-4 rounded-sm border border-teal-300 justify-center items-center gap-2.5 flex">
  <span className="text-center text-teal-300 text-sm font-medium uppercase tracking-wide">View All Blog Posts</span>
</Link>
            </div>
          </div>
        )}
    </>
  );
}
