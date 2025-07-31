import { useEffect } from "react";
import { useNavigate } from "react-router";


function ErrorPage(){

    const navigate = useNavigate
    useEffect(()=>{
        navigate('/')
    },[])

    return(
        <div>

        </div>
    )
}

export default ErrorPage;