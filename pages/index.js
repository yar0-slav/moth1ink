import React, { useState, Suspense  } from 'react'
import 'react-medium-image-zoom/dist/styles.css'

import dynamic from 'next/dynamic'

import { Container } from '@chakra-ui/react'

import IndexContent from '../components/sections/indexSection/indexContent'

const ImageGallery = dynamic(() => import('../components/sections/gallerySection'), {
  suspense: true,
});
const Reviews = dynamic(() => import('../components/sections/reviewsSection/reviewsSection'), {
  suspense: true,
});
const Contact = dynamic(() => import('../components/sections/contactSection'), {
  suspense: true,
});


import { getFolders, mapImageResources, search } from '../lib/cloudinary'
import { mapReviews } from '../lib/translate'
import { firestore, postToJSON } from '../lib/firebase'


// Max reviews to query
const LIMIT = 5

export default function Page({
  images: defaultImages,
  nextCursor: defaultNextCursor,
  folders,
  totalCount: defaultTotalCount,
  reviews: defaultReviews,
  reviewsTotal
}) {

  const [loaderActive, setLoaderActive] = useState(false)

  return (
    <Container
      className="index__content"
      maxW={'container.lg'}
      color={'white'}
      p={0}
    >
      <IndexContent></IndexContent>

      <Suspense fallback={<div>Loading...</div>}>
        <ImageGallery
          defaultImages={defaultImages}
          defaultNextCursor={defaultNextCursor}
          folders={folders}
          defaultTotalCount={defaultTotalCount}
          loaderActive={loaderActive}
          setLoaderActive={setLoaderActive}
        ></ImageGallery>
      </Suspense>
      
      <Suspense fallback={<div>Loading...</div>}>
        <Reviews
          reviews={defaultReviews}
          reviewsTotal={reviewsTotal}
          loaderActive={loaderActive}
          reviewsLimit={LIMIT}
        ></Reviews>
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Contact />
      </Suspense>

    </Container>
  )
}

export async function getServerSideProps() {
  const results = await search({
    expression: 'folder=""',
    max_results: 8
  })
  const {
    resources,
    next_cursor: nextCursor,
    total_count: totalCount
  } = results
  const images = mapImageResources(resources);
  const { folders } = await getFolders();

  const postsQuery = firestore
    .collection('comments')
    .orderBy('time', 'desc')
    .limit(LIMIT);
  const postsTotal = firestore
  .collection('comments')
  .orderBy('time', 'desc');

  const reviews = await mapReviews(postsQuery);
  const reviewsTotal = (await postsTotal.get()).docs.map(postToJSON).length;

  return {
    props: {
      images: JSON.parse(JSON.stringify(images)),
      nextCursor: nextCursor || false,
      totalCount,
      folders,
      reviews: JSON.parse(JSON.stringify(reviews)),
      reviewsTotal
    }
  }
}
