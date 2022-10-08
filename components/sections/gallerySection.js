import { Box, Button, Container, Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// import Zoom from 'react-medium-image-zoom'

import { mapImageResources } from '../../lib/cloudinary'

export default function ImageGallery({
  defaultImages,
  defaultNextCursor,
  folders,
  defaultTotalCount,
  loaderActive,
  setLoaderActive
}) {
  const [images, setImages] = useState(defaultImages)
  const [nextCursor, setNextCursor] = useState(defaultNextCursor)
  const [totalCount, setTotalCount] = useState(defaultTotalCount)
  const [activeFolder, setActiveFolder] = useState('')
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    (async function run() {
      const results = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          expression: `folder="${activeFolder || ''}"`
        })
      }).then(r => r.json())

      const {
        resources,
        next_cursor: updatedNextCursor,
        total_count: updatedTotalCount
      } = results

      const images = await mapImageResources(resources)

      setImages(images)
      setNextCursor(updatedNextCursor)
      setTotalCount(updatedTotalCount)
    })()
  }, [activeFolder])

  
  const LoadingSpinner = () => {
    useEffect(() => {
      return () => {
        setLoaderActive(true)
      }
    }, [])

    return (
      <Spinner
        className="gallery-spinner"
        size="xl"
        position="absolute"
        left="50%"
        top="50%"
        ml="calc(0px - var(--spinner-size) / 2)"
        mt="calc(0px - var(--spinner-size))"
        data-loader={loaderActive}
      />
    )
  }


  return (
    <Container
      maxW="container.lg"
      mt="5em"
      px={0}
      className="second-container opacity-container"
      justifyContent="space-between"
      id="gallery"
    >
      <Box className="opacity-wrapper">
        <Box
          py="2em"
          justifyContent="space-around"
          display="flex"
          flexWrap="wrap"
          onClick={handleOnFolderClick}
        >
          <Box key='""' p={2}>
            <Button
              fontSize="sm"
              variant="link"
              colorScheme="white"
              data-folder-path='""'
              data-ga="Tattoos Gallery"
              //   onClick={e => clickItem(e.target.getAttribute('data-ga'))}
            >
              Tattoos
            </Button>
          </Box>

          {folders
            .slice(0)
            .reverse()
            .map(folder => {
              const isActive = folder.path === activeFolder
              return (
                <Box key={folder.path} p={2} data-active-folder={isActive}>
                  <Button
                    variant="link"
                    fontSize="sm"
                    colorScheme="white"
                    data-folder-path={folder.path}
                    data-ga={folder.name + ' ' + 'Gallery'}
                    // onClick={e => clickItem(e.target.getAttribute('data-ga'))}
                  >
                    {folder.name}
                  </Button>
                </Box>
              )
            })}
        </Box>

        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          style={{ minHeight: 50 + 'vh' }}
        >
          {images[0] && images[0].src.length > 0 ? (
            images.map((image, index) => {
              return (
                <Box key={image.id} pb='6px'>
                <Image
                  alt={image.title}
                  src={image.src}
                  placeholder="blur"
                  blurDataURL={`data:image/jpeg;base64,${image.blurred}`}
                  width={image.width}
                  height={image.height}
                  pb="10px"
                  sizes={'30vw'}
                  layout="responsive"
                  onClick={() => setIndex(index)}
                />
                </Box>
              )
            })
          ) : (
            <LoadingSpinner></LoadingSpinner>
          )}
        </Masonry>

        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={images}
          render={{
            slide: (image, offset, rect) => {
              const width = Math.round(
                Math.min(rect.width, (rect.height / image.height) * image.width)
              )
              const height = Math.round(
                Math.min(rect.height, (rect.width / image.width) * image.height)
              )

              return (
                <div style={{ position: 'relative', width, height }}>
                  <Image
                    alt={image.title}
                    src={image.src}
                    width={image.width}
                    height={image.height}
                    layout="fill"
                    loading="eager"
                    objectFit="contain"
                    sizes={
                      typeof window !== 'undefined'
                        ? `${Math.ceil(
                            (image.width / window.innerWidth) * 100
                          )}vw`
                        : `${image.width}px`
                    }
                  />
                </div>
              )
            }
          }}
        />

        {totalCount > images.length && (
          <Flex justifyContent="center" mt={5}>
            <Button
              colorScheme="moth"
              onClick={handleLoadMore}
              display={loaderActive ? 'none' : 'block'}
            >
              Load more
            </Button>
          </Flex>
        )}
      </Box>
    </Container>
  )


  async function handleLoadMore(event) {
    event.preventDefault()

    const results = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        nextCursor,
        expression: `folder="${activeFolder || ''}"`
      })
    }).then(r => r.json())

    const {
      resources,
      next_cursor: updatedNextCursor,
      total_count: updatedTotalCount
    } = results

    const images = mapImageResources(resources)

    setImages(prev => {
      return [...prev, ...images]
    })

    setNextCursor(updatedNextCursor)
    setTotalCount(updatedTotalCount)
  }


  function handleOnFolderClick(event) {
    const folderPath = event.target.dataset.folderPath
    setActiveFolder(folderPath)
    setNextCursor(undefined)
    setImages([])
    setTotalCount(0)
  }

}
