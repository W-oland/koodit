interface Numbers {
    periodLength: number;
    traningDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseArguments = (args: Array<string>): Numbers => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (
        !isNaN(Number(args[2]))
        && !isNaN(Number(args[3]))
        && !isNaN(Number(args[5]))
        && !isNaN(Number(args[7]))
        && !isNaN(Number(args[8]))
    ) {
        return {
            periodLength: Number(args[2]),
            traningDays: Number(args[3]),
            success: Boolean(args[4]),
            rating: Number(args[5]),
            ratingDescription: args[6],
            target: Number(args[7]),
            average: Number(args[8])
        }
    }
    }
}