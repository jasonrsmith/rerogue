export const TILE_SIZE_PX=64

export const convert2to1 = (x, y, width) => {
    return y * width + x
}

export const convert1to2 = (i, width) => {
    const x = i % width
    const y = Math.floor(i / width)
    return [x, y]
}

export const pixelsToCoords = (x, y) => {
    return [x / TILE_SIZE_PX, y / TILE_SIZE_PX]
}

export const coordsToPixels = (x, y) => {
    return [x * TILE_SIZE_PX, y * TILE_SIZE_PX]
}
