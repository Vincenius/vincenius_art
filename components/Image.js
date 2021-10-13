import React, { useState, useEffect } from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { useInView } from 'react-intersection-observer'

import { imagesPath } from '../utils/constants'
import styles from '../styles/Image.module.css'
import { preloadImage } from '../utils'

const Image = ({ data, windowWidth, columns, openImage }) => {
  const [renderImage, setRenderImage] = useState(false)
  const { width, height } = data
  const imageResolution = height / width
  const margin = columns === 1
    ? 60
    : columns === 2 ? 50 : 45
  const imageWidth = (windowWidth / columns) - margin
  const responsiveImageHeight = imageWidth * imageResolution

  const sourceSet = `${imagesPath}w_320_${data.fileName} 320w, ${imagesPath}w_600_${data.fileName} 600w, ${imagesPath}w_900_${data.fileName} 900w, ${imagesPath}w_900_${data.fileName} 1200w`
  const sizes = "(min-width: 320px) 320px, (min-width: 600px) 600px, (min-width: 900px) 900px, (min-width: 120px) 120px, 100vw"
  const src = `${imagesPath}w_1200_${data.fileName}`

  const { ref, inView } = useInView({
    threshold: 0,
  })
  useEffect(() => {
    if (inView) {
      preloadImage({ sourceSet, sizes, src })
        .then(() => setRenderImage(true))
    }
  }, [inView])

  return <div ref={ref}>
    { !renderImage && <Skeleton
      variant="rect"
      height={responsiveImageHeight}
      width={imageWidth}
      className={styles.imagePreview}
    /> }
    { renderImage && <img
      sizes={sizes}
      srcSet={sourceSet}
      src={src}
      alt={data.description || data.fileName}
      className={styles.image}
      onClick={() => openImage()}
      height={responsiveImageHeight}
    /> }
  </div>
}

export default Image