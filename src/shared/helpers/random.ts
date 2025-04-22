export const randomInRangeWithStep = (start, end, step) => {
    // Ensure start is less than or equal to end
    if (start > end) {
        throw new Error('Start value must be less than or equal to end value');
    }

    // Calculate the number of steps within the range, including the start and end
    const numSteps = Math.floor((end - start) / step) + 1;

    // Generate a random integer between 0 and the number of steps minus 1 (inclusive)
    const randomStep = Math.floor(Math.random() * numSteps);

    // Return the corresponding value within the range based on the random step
    return start + randomStep * step;
};
