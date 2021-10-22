interface MultiplyValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const multiplicator = (KGmass: number, CMheight: number) => {
    const BMI = KGmass / ((CMheight/100) **2)
    if (BMI < 18.5) {
        return ('Underweight')
    } else if (BMI >= 18.5 && BMI <= 24.9) {
        return ('Normal')
    } else if (BMI >= 25 && BMI <= 29.9) {
        return ('Overweight')
    } else {
        return ('Obese')
    }
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(multiplicator(value1, value2)); 
} catch (e) {
    console.log('Error, something bad happened, message: ', e.message)
}