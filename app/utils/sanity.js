import {createClient} from '@sanity/client';
import groq from 'groq';
const SANITY_PROJECT_ID = 'bziept29';
const SANITY_DATASET = 'production';

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  throw new Error('Did you forget to run sanity init --env?');
}

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2023-03-20', // date of setup
});

export async function getPosts() {
  return await client.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
  );
}

export async function getPost(slug) {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    },
  );
}
