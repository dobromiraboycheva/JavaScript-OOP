/* Task description */
/*
	Write a function that finds all the prime numbers in a range
		1) it should return the prime numbers in an array
		2) it must throw an Error if any on the range params is not convertible to `Number`
		3) it must throw an Error if any of the range params is missing
*/

function findPrimes(start, end) {
    if (arguments.length < 2) {
        throw new Error('Parametars must be 2!!!');
    }
    if (start != Number(start) || end != Number(end)) {
        throw new Error('All paranetars must be numbers');
    } else {

        var result = [],
            i,
            start = parseInt(start),
            end = parseInt(end);

        for (var i = start; i <= end; i++) {
            if (isPrime(i)) {
                result.push(i);
            }
        }
        return result;
    }

    function isPrime(number) {
        var i,
            isPrime = true;
        if (number < 2) {
            isPrime = false;
            return isPrime;
        }
        for (var i = 2; i <= Math.sqrt(number) ; i++) {
            if (number % i === 0) {
                isPrime = false;
                break;
            }
        }
        return isPrime;
    }
}

module.exports = findPrimes;
