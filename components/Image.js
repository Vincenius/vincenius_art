import React, { useState, useEffect } from 'react'
import LazyLoad from 'react-lazyload'
import Skeleton from '@material-ui/lab/Skeleton'
import { useInView } from 'react-intersection-observer'

import { imagesPath, breakpointColumnsObj } from '../utils/constants'
import styles from '../styles/Image.module.css'

const Image = ({ data, windowWidth, columns, openImage }) => {
  const [renderImage, setRenderImage] = useState(false)
  const { width, height } = data
  const imageResolution = height / width
  const imageWidth = (windowWidth / columns) - 20 // 20 = margin
  const responsiveImageHeight = imageWidth * imageResolution
  const { ref, inView } = useInView({
    threshold: 0,
  })
  useEffect(() => {
    setTimeout(() => {
      if (inView) {
        setRenderImage(true)
      }
    }, 500)
  }, [inView])

  return <div ref={ref}>
    { !renderImage && <Skeleton
      variant="rect"
      height={responsiveImageHeight}
      width={imageWidth}
      className={styles.imagePreview}
    /> }
    { renderImage && <picture>
      <source srcset={`${imagesPath}w_320_${data.fileName}`} media="(max-width: 320px)" />
      <source srcset={`${imagesPath}w_600_${data.fileName}`} media="(max-width: 320px) and (-webkit-min-device-pixel-ratio: 2)" />
      <source srcset={`${imagesPath}w_600_${data.fileName}`} media="(max-width: 499px)" />
      <source srcset={`${imagesPath}w_900_${data.fileName}`} media="(max-width: 499px) and (-webkit-min-device-pixel-ratio: 2)" />
      <source srcset={`${imagesPath}w_900_${data.fileName}`} media="(max-width: 900px)" />
      <source srcset={`${imagesPath}w_1200_${data.fileName}`} media="(max-width: 900px) and (-webkit-min-device-pixel-ratio: 2)" />
      <img
        src={`${imagesPath}${data.fileName}`}
        alt={data.description || data.fileName}
        className={styles.image}
        onClick={() => openImage()}
      />
    </picture> }
  </div>
}

export default Image