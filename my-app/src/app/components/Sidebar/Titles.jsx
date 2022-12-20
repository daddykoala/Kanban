import React from 'react';

function Titles({names,key}) {
  return (
    <div key={key}>{names}</div>
  )
}

export default React.memo(Titles);