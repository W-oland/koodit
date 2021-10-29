import React from 'react';

interface Course {
    name: string;
    exerciseCount: number;
}

const Total = ({ list }: { list: Course[] })  => {
    const total = list.reduce( (carry,part) => carry + part.exerciseCount, 0 )
    return <p>Number of exercises{" "} {total}</p>
}

export default Total;