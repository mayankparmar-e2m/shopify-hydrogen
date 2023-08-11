import groq from "groq";
export const IMAGE_WITH_TEXT = groq`
*[_type == 'home'] | order(_updatedAt desc) [0]{
homeImageWithText{
  _type,
  title,
  image,
  ctaLabel,
  desc,
    ctaUrl->{
      _type,
      store{
      slug
      }
    }
}
 }
`