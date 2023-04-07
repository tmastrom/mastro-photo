import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import useKeypress from 'react-use-keypress'
import type { ImageProps } from '../utils/types'
import MotionImage from '../components/MotionImage'
import { useState } from 'react'
import Header from '../components/header'


const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()

  const [direction, setDirection] = useState(0)
  const [index, setIndex] = useState(0)

  function changePhotoId(newVal: number) {
    if (newVal > index) {
      setDirection(1)
    } else {
      setDirection(-1)
    }
    setIndex(newVal)
    // router.push(
    //   {
    //     query: { photoId: newVal },
    //   },
    //   `/p/${newVal}`,
    //   { shallow: true }
    // )
  }

  function useButton(dir: boolean) {
    if (dir && index +1 < images.length) {
      changePhotoId(index + 1)
    }
    else if (!dir && index > 0) {
      changePhotoId(index - 1)
    }
  }

  useKeypress('ArrowRight', () => {
    if (index + 1 < images.length) {
      changePhotoId(index + 1)
    }
  })

  useKeypress('ArrowLeft', () => {
    if (index > 0) {
      changePhotoId(index - 1)
    }
  })

  return (
    <>
      <Head>
        <title>Thomas Mastromonaco Photography</title>
      </Head>
      <Header />
      <MotionImage
        index={index}
        direction={direction}
        images={images}
        changePhotoId={changePhotoId}
        navigation={true}
      />
    </>
  )
}

export default Home

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:${process.env.CLOUDINARY_FOLDER}/*`)
    .sort_by('public_id', 'desc')
    .max_results(400)
    .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
