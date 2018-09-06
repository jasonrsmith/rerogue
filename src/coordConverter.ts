export const TILE_SIZE_PX = 64

export const convert2to1 = (x: number, y: number, width: number) => {
    return y * width + x
}

export const convert1to2 = (i: number, width: number) => {
    const x = i % width
    const y = Math.floor(i / width)
    return [x, y]
}

export const pixelsToCoords = (x: number, y: number) => {
    return [x / TILE_SIZE_PX, y / TILE_SIZE_PX]
}

export const coordsToPixels = (x: number, y: number) => {
    return [x * TILE_SIZE_PX, y * TILE_SIZE_PX]
}
