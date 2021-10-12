const preloadImage = ({ sourceSet, sizes, src }) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = src
        img.srcset = sourceSet
        img.sizes = sizes
        img.onload = resolve
        img.onerror = reject
    })
}

export default preloadImage
