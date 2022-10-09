import { Box, Button, Container, Flex, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Masonry from 'react-masonry-css'

import * as ga from '../../lib/ga'

import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

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

  const breakpointColumnsObj = {
    default: 3,
    764: 2,
    321: 1
  }

  const clickItem = data => {
    ga.event({
      action: 'click',
      params: {
        item: data
      }
    })
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
              onClick={e => clickItem(e.target.getAttribute('data-ga'))}
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
                    onClick={e => clickItem(e.target.getAttribute('data-ga'))}
                  >
                    {folder.name}
                  </Button>
                </Box>
              )
            })}
        </Box>

        <Gallery>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            style={{ minHeight: 50 + 'vh' }}
          >
            {images[0] && images[0].src.length > 0 ? (
              images.map((image, index) => {
                return (
                  <Box key={image.id} pb="6px" _hover={{ cursor: 'pointer' }}>
                    <Item
                      original={image.src}
                      thumbnail={image.thumbnail}
                      width={image.width}
                      height={image.height}
                    >
                      {({ ref, open }) => (
                        <a ref={ref} onClick={open}>
                          {index <= 2 ? (
                            <Image
                              priority
                              alt={image.title}
                              src={image.thumbnail}
                              placeholder="blur"
                              blurDataURL={`data:image/jpeg;base64,${image.blurred}`}
                              width={image.width}
                              height={image.height}
                              pb="10px"
                              sizes={'20vw'}
                              layout="responsive"
                            />
                          ) : (
                            <Image
                              alt={image.title}
                              src={image.thumbnail}
                              placeholder="blur"
                              blurDataURL={`data:image/jpeg;base64,${image.blurred}`}
                              width={image.width}
                              height={image.height}
                              pb="10px"
                              sizes={'20vw'}
                              layout="responsive"
                            />
                          )}
                        </a>
                      )}
                    </Item>
                  </Box>
                )
              })
            ) : (
              <LoadingSpinner></LoadingSpinner>
            )}
          </Masonry>
        </Gallery>

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
