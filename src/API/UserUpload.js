export const getAudios = async(id)=>{
    try {
      
      const Data = await fetch(`/upload/getaudios/${id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
        },
      })
      const response = await Data.json();
      return response 
  
    } catch (error) {
        return error
    }
}

export const addAudio = async(formData)=>{
  try {
    const Data = await fetch(`/upload/audio`,{
      method:"POST",

      headers:{     
        Accept:"application/json",  
      },

      body: formData
    })
    const response = await Data.json();
    return response 

  } catch (error) {
      return error
  }
}

export const addVideo = async(formData)=>{
  try {
    const Data = await fetch(`/upload/video`,{
      method:"POST",

      headers:{     
        Accept:"application/json",  
      },

      body: formData
    })
    const response = await Data.json();
    return response 

  } catch (error) {
      return error
  }
}