import React, { useState } from 'react'
import Image from 'next/image'
import { Container } from '@chakra-ui/react'

export function BlurringImage({
  svg: [Svg, svgProps, rectangles],
  img,
  alt,
  blurLevel = 5,
  height = undefined,
  width = undefined,
  ...props
}) {
  const [hasPlaceholder, setHasPlaceholder] = useState(true)

  return (
    <Container>
      {hasPlaceholder && (
        <Svg
          {...svgProps}
          style={{
            ...svgProps.style,
            filter: `blur(${blurLevel}px)`
          }}
        >
          {rectangles.map(([Rect, rectProps]) => (
            <Rect {...rectProps} key={`${rectProps.x}${rectProps.y}`} />
          ))}
        </Svg>
      )}

      <Image
        {...img}
        {...props}
        height={height}
        width={width}
        alt={alt}
        onLoadingComplete={() => setHasPlaceholder(false)}
      />
    </Container>
  )
}
