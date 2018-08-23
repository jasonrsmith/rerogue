export const convert2to1 = (x, y, width) => {
    return y * width + x
}

export const convert1to2 = (i, width) => {
    const x = i % width
    const y = Math.floor(i / width)
    return [x, y]
}
