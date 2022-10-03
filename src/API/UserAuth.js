
export const signUp = async(first_name,last_name,email,password)=>{

    try {
        
      const Data = await fetch(`/user/create`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({first_name,last_name,email,password})
      })
      const response = await Data.json();
      return response

    } catch (error) {
        return error
    }

}

export const logIn = async(email,password)=>{

  try {
      
    const Data = await fetch("/user/login",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    const response = await Data.json();
    return response

  } catch (error) {
      return error
  }

}

export const authUser = async(token)=>{
  try {
        
    const Data = await fetch("/user/auth",{
      method:"POST",
      headers:{
          "Content-Type":"application/json",
          "auth-token":token
      },
    })
    const response = await Data.json();
    return response

  } catch (error) {
      return error
  }
}