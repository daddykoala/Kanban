import React from 'react';

function Titles({names,key,className}) {
  return (
    <div key={key}>{names}</div>
  )
}

export default React.memo(Titles);