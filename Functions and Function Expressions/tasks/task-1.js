/* Task Description */
/* 
	Write a function that sums an array of numbers:
		numbers must be always of type Number
		returns `null` if the array is empty
		throws Error if the parameter is not passed (undefined)
		throws if any of the elements is not convertible to Number	

*/

function sum(numbers) {
    if (numbers === undefined) {
        throw new Error('The array cannot be empoty.');
    } else if (!numbers.length) {
        return null;
    } else {
        if (!numbers.every(function (number) {
                return number == Number(number);
        })) {
            throw new Error('All elements must be numbers.');
        }

        return numbers.reduce(function (currentSum, number) {
            return currentSum += parseInt(number);
        }, 0);
    }
}


module.exports = sum;