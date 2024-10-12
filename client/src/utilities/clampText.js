const clampText = (label, maxLength = 10) => {
    if (label.length > maxLength) {
        return label.slice(0, maxLength) + '...';
    }
    return label;
};

const wrapText = (label, maxLineLength = 75) => {
    let wrappedLabel = '';
    let lineLength = 0;

    const words = label.split(' ');
    words.forEach((word) => {
        if (lineLength + word.length + 1 > maxLineLength) {
            wrappedLabel = wrappedLabel.trim() + '\n';
            lineLength = 0;
        }
        wrappedLabel += word + ' ';
        lineLength += word.length + 1;
    });

    return wrappedLabel.trim();
};

export default clampText;
export { wrapText };