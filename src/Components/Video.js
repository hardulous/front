import React, { useEffect } from 'react'

const Video = ({id}) => {

  return (

    <video controls style={{width:"100%"}}>
      <source src={`/upload/getvideo/${id}`} />
    </video>

  )
}

export default Video