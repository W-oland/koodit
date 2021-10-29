import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(`Undandled disciminated union member: ${JSON.stringify(value)}`);
};


const Part = ({coursePart}: {coursePart: CoursePart}) => {
    
    switch (coursePart.type) {
      case "normal":
        return (
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
        );
      case "groupProject":
        return (
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
        );
      case "submission":
        return (
          <p>{coursePart.name} {coursePart.exerciseCount}</p>
        );
    default:
      return assertNever(coursePart);
    }
}

export default Part;