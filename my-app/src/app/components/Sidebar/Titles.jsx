import React from 'react';

function Titles({names,index,className}) {
  return (
    <div key={index}>{names}</div>
  )
}

export default React.memo(Titles);