import React from 'react';
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(`Undandled disciminated union member: ${JSON.stringify(value)}`);
};


const Part = ({coursePart}: {coursePart: CoursePart}) => {
    
    switch (coursePart.type) {
      case "normal":
        return (
          <>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <p>
              <em>{coursePart.description}</em>
            </p>
          </>
        );
      case "groupProject":
        return (
          <>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <p>project exercises {coursePart.exerciseCount}</p>
          </>
        );
      case "submission":
        return (
          <>
            <b>{coursePart.name} {coursePart.exerciseCount}</b>
            <p>
              <em>{coursePart.description}</em>
              </p>
            <p>submit to {coursePart.exerciseSubmissionLink}</p>
          </>
        );
      case "special":
        return (
          <>
          <b>{coursePart.name} {coursePart.exerciseCount}</b>
          <p>required skills: { coursePart.requirements.map((requirement, index) => (index ? ", ": "") + requirement) }</p>
          </>
        )
    default:
      return assertNever(coursePart);
    }
}

export default Part;