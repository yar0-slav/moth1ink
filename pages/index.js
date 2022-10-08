import React, { useState } from 'react'
import 'react-medium-image-zoom/dist/styles.css'

import { Container } from '@chakra-ui/react'

import Gallery from '../components/sections/gallerySection'
import Reviews from '../components/sections/reviewsSection/reviewsSection'
import Contact from '../components/sections/contactSection'
import IndexContent from '../components/sections/indexSection/indexContent'


import { getFolders, mapImageResources, search } from '../lib/cloudinary'
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

      <Gallery
        defaultImages={defaultImages}
        defaultNextCursor={defaultNextCursor}
        folders={folders}
        defaultTotalCount={defaultTotalCount}
        loaderActive={loaderActive}
        setLoaderActive={setLoaderActive}
      ></Gallery>

      <Reviews
        reviews={defaultReviews}
        reviewsTotal={reviewsTotal.length}
        loaderActive={loaderActive}
        reviewsLimit={LIMIT}
      ></Reviews>

      <Contact />

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
  const images = mapImageResources(resources)
  const { folders } = await getFolders()

  const postsQuery = firestore
    .collection('comments')
    .orderBy('time', 'desc')
    .limit(LIMIT)
  const postsTotal = firestore.collection('reviews').orderBy('time', 'desc')
  const reviews = (await postsQuery.get()).docs.map(postToJSON)
  const reviewsTotal = (await postsTotal.get()).docs.map(postToJSON)

  return {
    props: {
      images,
      nextCursor: nextCursor || false,
      totalCount,
      folders,
      reviews,
      reviewsTotal
    }
  }
}
