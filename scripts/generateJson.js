// A small nodejs script to create an images.json file
// based on all files in the gallery directory

const fs = require('fs');
const sizeOf = require('image-size')
const path = require('path');

const galleryPath = path.normalize(`${__dirname}/../public/gallery/`)
const jsonPath = path.normalize(`${__dirname}/../pages/images.json`)

// TODO read existing json file and skip already existing entries
// TODO option to sort by file creation date?

console.log('updating images json file...')

const imageJson = fs.readFileSync(jsonPath, 'utf8');
const imageData = JSON.parse(imageJson);

fs.readdir(galleryPath, (err, filenames) => {
  // reverse to have newest one first (depends on your sorting)
  const json = filenames.reverse().map(fileName => {
    const { width, height } = sizeOf(galleryPath + fileName)

    // return existing data or add new ones
    return imageData.find(i => i.fileName === fileName) || {
      fileName,
      description: '',
      width,
      height,
    }
  })

  const jsonString = JSON.stringify(json)
  fs.writeFileSync(jsonPath, jsonString);

  console.log('Done')
})
