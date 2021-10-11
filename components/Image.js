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
    { renderImage && <img
      sizes="(min-width: 320px) 320px, (min-width: 600px) 600px, (min-width: 900px) 900px, (min-width: 120px) 120px, 100vw"
      srcset={`${imagesPath}w_320_${data.fileName} 320w, ${imagesPath}w_600_${data.fileName} 600w, ${imagesPath}w_900_${data.fileName} 900w, ${imagesPath}w_900_${data.fileName} 1200w`}
      src={`${imagesPath}w_1200_${data.fileName}`}
      alt={data.description || data.fileName}
      className={styles.image}
      onClick={() => openImage()}
    /> }
  </div>
}

export default Image