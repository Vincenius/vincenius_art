const fs = require('fs');
const path = require('path');
const compress_images = require("compress-images");
const resizeImg = require('resize-img');

const sourceDir = path.normalize(`${__dirname}/../public/gallery`)
const tempThumbnailDir = path.normalize(`${__dirname}/../out/temp`)
const outGalleryDir = path.normalize(`${__dirname}/../out/gallery/`)

const generateThumnails = width => new Promise((resolve, reject) => {
    fs.readdir(sourceDir, async (err, files) => {
        const filePromises = files.map(async file => {
            const filePath = `${sourceDir}/${file}`
            const image = await resizeImg(fs.readFileSync(filePath), { width });

            return fs.writeFileSync(`${tempThumbnailDir}/w_${width}_${file}`, image);
        })

        await Promise.all(filePromises)
        resolve()
    })
})

const compressImages = inputDir => new Promise((resolve, reject) => {
    const INPUT_PATH = `${inputDir}/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}`;
    const OUTPUT_PATH = outGalleryDir;

    compress_images(INPUT_PATH, OUTPUT_PATH, { compress_force: true, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        (error, completed, statistic) => {
            // console.log("-------------");
            // console.log(error);
            // console.log(completed);
            // console.log(statistic);
            // console.log("-------------");

            if (completed) {
                resolve()
            }
        });
})


const processImages = async () => {
    if (!fs.existsSync(tempThumbnailDir)) {
        fs.mkdirSync(tempThumbnailDir)
    }

    const sizes = [320, 600, 900, 1200]
    const thumbnailPromises = sizes.map(generateThumnails)

    console.log('Generating image sizes...')

    await Promise.all(thumbnailPromises)

    console.log('Done generating image sizes')
    console.log('-----------------------')
    console.log('Compressing images...')

    compressImages(sourceDir)
    compressImages(tempThumbnailDir).then(() => {
        console.log('Done compressing thumbnails')
        console.log('Deleting temp directory')

        fs.rmdirSync(tempThumbnailDir, { recursive: true });
    })
}

processImages()
