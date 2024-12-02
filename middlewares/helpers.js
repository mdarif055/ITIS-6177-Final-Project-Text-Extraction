//Function to get text from Image
export const squishTextRegions = (regions) => {
    let text = "";
    for (const region of regions) {
        for (const line of region.lines) {
            for (const word of line.words) {
                text += word.text + " ";
            }
        }
    }
    return text;
}
