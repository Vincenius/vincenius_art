import { useState } from 'react'
import Head from 'next/head'
import Masonry from 'react-masonry-css'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

import Image from '../components/Image'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import { useWindowSize } from '../utils'
import { imagesPath, breakpointColumnsObj } from '../utils/constants'
import images from './images.json'

const getColumns = width => {
  const elem = Object.entries(breakpointColumnsObj).find(
    ([breakpoint]) => width <= breakpoint
  )
  return elem ? elem[1] : breakpointColumnsObj.default
}

export default function Home() {
  const { width: windowWidth } = useWindowSize()
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setLightboxOpen] = useState(false)
  const columns = getColumns(windowWidth)
  const prevImageIndex = lightboxIndex === 0
    ? images.length - 1 // last item
    : lightboxIndex - 1
  const nextImageIndex = lightboxIndex === (images.length - 1)
    ? 0 // first item
    : lightboxIndex + 1

  return (
    <div className={styles.container}>
      <Head>
        <title>Vincenius Art - creating art with spray paint and stencils</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width"/>
        <meta name="description" content="The website to showcase the art created by Vincent Will." />

        <meta property="og:title" content="Vincenius Art - creating art with spray paint and stencils" />
        <meta property="og:description" content="Creating art with spray paint and stencils" />
        <meta property="og:image" content="https://vincenius.com/og-image.jpg" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vincenius.com/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://vincenius.com/" />
        <meta name="twitter:title" content="Creating art with spray paint and stencils"  />
        <meta name="twitter:description" content="The website to showcase the art created by Vincent Will." />
        <meta name="twitter:creator" content="@wweb_dev" />
        <meta name="twitter:image" content="https://vincenius.com/og-image.jpg" />

        <link rel="canonical" href="https://vincenius.com/" />

        <link rel="icon" href="/favicon.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#FFAB00" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text:wght@900&display=swap" rel="stylesheet" />

        <script defer src="https://analytics.vincentwill.com/script.js" data-website-id="a070b6c4-056f-4a13-948a-76c5b76cc7fe"></script>
      </Head>

      <Header />

      <main className={styles.main}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryGridColumn}
        >
          { images.map((image, index) =>
            <Image
              data={image}
              key={`image${index}`}
              windowWidth={windowWidth}
              columns={columns}
              openImage={() => {
                setLightboxIndex(index)
                setLightboxOpen(true)
              }}
            />
          )}
        </Masonry>

        { isLightboxOpen && <Lightbox
            mainSrc={`${imagesPath}${images[lightboxIndex].fileName}`}
            nextSrc={`${imagesPath}${images[nextImageIndex].fileName}`}
            prevSrc={`${imagesPath}${images[prevImageIndex].fileName}`}
            onCloseRequest={() => setLightboxOpen(false)}
            onMovePrevRequest={() => setLightboxIndex(prevImageIndex)}
            onMoveNextRequest={() => setLightboxIndex(nextImageIndex)}
            imageCaption={images[lightboxIndex].description}
          /> }
      </main>

      <Footer />
    </div>
  )
}
