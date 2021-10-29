import React from 'react'

interface courseJSON {
    name: string;
    exerciseCount: number;
}

const Content = ({ json }: { json: courseJSON[] })  => {
    return (
      <div>
        <p>{json[0].name} {json[0].exerciseCount}</p>
        <p>{json[1].name} {json[1].exerciseCount}</p>
        <p>{json[2].name} {json[2].exerciseCount}</p>
      </div>
    )
}

export default Content;