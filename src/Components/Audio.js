import React, { useEffect } from 'react'

const Audio = ({id}) => {
  return (

    <audio controls style={{width:"100%"}}>
      <source src={`/upload/getaudio/${id}`} />
    </audio>

  )
}

export default Audio