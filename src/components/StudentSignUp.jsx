import axios from 'axios'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
// compent for signing up for the tag game
export default function StudentSignUp(props){
  
  // useNavigate to navigate after successful submission
  const navigate = useNavigate()

  // state that stores values in inputs
  const [inputValue, setInputValue] = useState({name: "", email:"", target: ""})

  // regex test to see if email is valid
  const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputValue.email) || inputValue.email==""

  // returns an error if validEmail is false
  const validEmailMessage = validEmail? "": <div style={{textAlign:"left", padding: "0", color: "red", fontSize:".8rem"}}>*Please enter a valid email</div>

  // regex test to see if name is valid
  const validName = /[^\d\s]/.test(inputValue.name) || inputValue.name==""
  console.log(validName)

  // on submission, the function sends post request to backend, and navigates away if successful
  function handleSubmit(event){
    event.preventDefault();
    console.log(inputValue.name)
    axios.post("https://senior-assassins-backend.aletya.repl.co/students", inputValue)
      .then(response => {
        navigate("/SeniorAssassinsFullstack/success")
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }
  
  return(
    
    <div className="align-left text-center">
      <h3 className="mt-3">Sign Up</h3>
      <form onSubmit={handleSubmit} className="row" style={{width: "30%", marginLeft: "35%"}}>
        {/* name */}
        <div style={{textAlign: "left", padding: "0"}}><strong>Name</strong></div>
        <input type="text" value={inputValue.name} onChange={(e) => setInputValue({...inputValue, name: e.target.value})}/>
        
        {/* email */}
        <div style={{textAlign: "left", padding: "0", marginTop: "1%"}}><strong>Email</strong></div>
        <input type="text" value={inputValue.email} onChange={(e) => setInputValue({...inputValue, email: e.target.value})}/>
        {validEmailMessage}
        <input className="mt-3" type="submit"></input>
      </form>
    </div>
  )
}