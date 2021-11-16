

const baseUrl= process.env.REACT_APP_API_URL;

export const fethSinToken=(endpoint,data,method='GET')=>{

  const url=`${baseUrl}/${endpoint}`;

  if(method ==='GET')
  {
      return fetch(url);
  }
  else{
     const options = { 
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }    
      
       return fetch(url, options);

  }
}


export const fethConToken=(endpoint,data,method='GET')=>{

  const url=`${baseUrl}/${endpoint}`;

  if(method ==='GET')
  {
      return fetch(url,{
        method,
        headers:{
          'x-token':localStorage.getItem('token')  || ''
        }
      });
  }
  else{
     const options = { 
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-token':localStorage.getItem('token')  || ''
        },
        body: JSON.stringify(data)
      }    
      
       return fetch(url, options);

  }
}



