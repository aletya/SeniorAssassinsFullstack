import {useNavigate} from 'react-router-dom';


export default function SuccessfulLogin(){
  const navigate = useNavigate();
  

  // does this need documentation?
  return(
    <div className="text-left m-5">
      SUCCESSFUL
      <br/>
      <button onClick={() => {navigate("/SeniorAssassinsFullstack")}}> Return To Home </button>
    </div>
  )
}