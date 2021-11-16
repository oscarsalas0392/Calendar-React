import Swal from "sweetalert2";
import { fethConToken, fethSinToken } from "../helpers/fetch"
import { types } from "../types/types";

 const startLogin =(email,password)=>{

    return async(dispatch)=>{
        const resp = await fethSinToken('auth',{email,password},'POST');
        const body = await resp.json();

        if(body.ok)
        {
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))

        }
        else{
            console.log(body.msg);
            Swal.fire('Error',body.msg,'error');
        }
    }
}


const startRegister=(email,password,name)=>{

    return async(dispatch)=>
    {
        const resp = await fethSinToken('auth/new',{email,password,name},'POST');
        const body = await resp.json();

        if(body.ok)
        {
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))

        }
        else{
            Swal.fire('Error',body.msg,'error');
        }

    }
}


export const startChecking=()=>{
    return async(dispatch)=>
    {
        const resp = await fethConToken('auth/renew');
        const body = await resp.json();

        if(body.ok)
        {
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());

          

            dispatch(login({
                uid:body.uid,
                name:body.name
            }))

        }
        else{
            Swal.fire('Error',body.msg,'error');
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish =()=>({
    type:types.authCheckingFinish
});

const login=(user)=>({
    type:types.authLogin,
    payload:user
});


export const startLogout = ()=>{
    return(dispatch)=>{
        localStorage.clear();
        dispatch(logout());
    }
}


const logout=()=>({
    type:types.authLogout
})

export {
    startLogin,
    startRegister
}