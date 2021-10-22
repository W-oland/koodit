interface Input {
    target: number;
    hours: Array<number>;
}

interface Output {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parser = (args: Array<string>): Input => {
    if (args.length < 4) throw new Error('Too few arguments');
    const hours = args.slice(3).map(hours => Number(hours)) // <-- type casting string array into number array

    if (!hours.some(isNaN) && !isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            hours: hours,
        }
    } else {
        throw new Error ('Malformatted values. Insert numbers only.')
    }
}

const counter = (first: number, second: Array<number>): Output => {
    const periodLength = second.length;
    const trainingDays = second.filter(value => value > 0).length;
    const average = second.reduce( (a,b) => (a+b) / second.length ); // <-- used in the next line
    const success = (first >= average) ? true : false ;
    const rating = (first > average) ? 1 
        : (first = average) ? 2 
        : (first < average) ? 3 
        : 0;
    const ratingDescription = (first > average) ? 'Bad' 
    : (first = average) ? 'Better' 
    : (first < average) ? 'Best' 
    : 'Worst';

    const target = first;

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
}

try {
    const { target, hours } = parser(process.argv);
    console.log(counter(target, hours));
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message)
}