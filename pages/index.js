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
        <meta name="theme-color" content="#BAE9BB" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Text:wght@900&display=swap" rel="stylesheet" />

        <script async defer data-website-id="1e4fb5c8-219e-4b0b-92e1-428579552b58" src="https://analytics.vincentwill.com/umami.js"></script>
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
            nextSrc={images[(lightboxIndex + 1) % images.length]}
            prevSrc={images[(lightboxIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setLightboxOpen(false)}
            onMovePrevRequest={() => setLightboxIndex((lightboxIndex + images.length - 1) % images.length)}
            onMoveNextRequest={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
            imageCaption={images[lightboxIndex].description}
          /> }
      </main>

      <Footer />
    </div>
  )
}
