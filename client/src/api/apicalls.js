import axios from 'axios';

export const getCategories = () => {
    return fetch(`/api/categories`, {
        method: 'GET'
    }).then(response => {
       
        return response.json()
    }).catch(err => console.log(err))
}

export const getHomeProducts =() =>{
    return fetch(`/api/getProducts`, {
        method: 'GET'
    }).then(response => {
       
        return response.json()
    }).catch(err => console.log(err))
}

export const getProductById = (id) =>{
    return fetch(`/api/getProductById/${id}`, {
        method: 'GET'
    }).then(response=>{
       return response.json()
    }).catch(err => {
       return err.message
    })
}


export const getSearchProducts = (data) =>{
    return fetch(`/api/searchProduct/${data}`, {
        method: 'GET'
    }).then(response=>{
       return response.json()
    }).catch(err => {
       return err.message
    })
}

export  const registerUser = (data) =>{
    
    return axios.post('/api/signup',data)
    .then(response=>{
        // console.log(response);
        return response;
    }).catch(err =>{
        // console.log(err)
        return  err
    })
}

export  const loginUser = (data) =>{
    return axios.post('/api/signin',data)
    .then(response=>{
        // console.log(response);
        return response;
    }).catch(err =>{
        // console.log(err)
        return  err
    })
}

export  const logoutUser = (data) =>{
    
    return axios.get('/api/signout')
    .then(response=>{
        // console.log(response);
        
        return response;
    }).catch(err =>{
        // console.log(err)
        return  err
    })
}


export  const addProductToCart = (data,userId) =>{
   return axios.post(`/api/addCart/${userId}`,data)
    .then(response=>{
        console.log(response);
       
        return response;
    }).catch(err =>{
         console.log(err)
        return  err
    })
}

export  const getCart = (userId) =>{
    return axios.get(`/api/getCart/${userId}`)
     .then(response=>{
         console.log(response);
        
         return response;
     }).catch(err =>{
          console.log(err)
         return  err
     })
 }
 
 export  const updateCart= (userId,productId,quantity) =>{
    return axios.patch(`/api/updateCart/${userId}`,{quantity,productId})
     .then(response=>{
         console.log(response);
        
         return response;
     }).catch(err =>{
          console.log(err)
         return  err
     })
 }


 export  const removeCartItem = (userId,productId) =>{
    return axios.delete(`/api/deleteCart/${userId}/${productId}`)
     .then(response=>{
         console.log(response);
        
         return response;
     }).catch(err =>{
          console.log(err)
         return  err
     })
 }