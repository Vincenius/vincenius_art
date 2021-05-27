import React from 'react'
import LazyLoad from 'react-lazyload'
import Skeleton from '@material-ui/lab/Skeleton'

import { imagesPath } from '../utils/constants'
import styles from '../styles/Image.module.css'

const Image = ({ data, windowWidth, columns, openImage }) => {
  const { width, height } = data
  const imageResolution = height / width
  const imageWidth = (windowWidth / columns) - 20 // 20 = margin
  const responsiveImageHeight = imageWidth * imageResolution

  return <div>
    <LazyLoad
      height={responsiveImageHeight + 20}
      placeholder={<Skeleton
        variant="rect"
        height={600}
        className={styles.imagePreview}
      />}
      once
      offset={100}
    >
      <img
        sizes={`
          (min-width: 1200px) 1600px,
          (min-width: 900px) 900px,
          (min-width: 500px) 600px,
          (min-width: 320px) 320px,
          100vw
        `}
        srcSet={`
          ${imagesPath}w_320_${data.fileName} 320w,
          ${imagesPath}w_600_${data.fileName} 600w,
          ${imagesPath}w_900_${data.fileName} 900w,
          ${imagesPath}w_1200_${data.fileName} 1200w,
          ${imagesPath}${data.fileName} 1600w
        `}
        src={`${imagesPath}${data.fileName}`}
        alt={data.description || data.fileName}
        className={styles.image}
        onClick={() => openImage()}
      />
    </LazyLoad>
  </div>
}

export default Image
