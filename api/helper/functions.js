// Define function with number and decimal places
exports.roundToDecimalPlaces = (number, decimalPlaces) => {
    // Set factor for rounding precision
    const factor = Math.pow(10, decimalPlaces);

    // Round number by factor, then divide by factor for result
    return Math.round(number * factor) / factor;
}