import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
export default function SubmitKill(props){


  
  const navigate = useNavigate()

  // state
  const [names, setNames] = useState([])
  const [nameSearchTerm, setNameSearchTerm] = useState('')
  const [targetSearchTerm, setTargetSearchTerm] = useState('')
  

  const filteredNames = names.filter((name) => name.toLowerCase().includes(nameSearchTerm.toLowerCase()))
  const filteredTargets = names.filter((name) => name.toLowerCase().includes(targetSearchTerm.toLowerCase()))

  const handleNameSearch = (event) => {
    setNameSearchTerm(event.target.value)
  }
  const handleTargetSearch = (event) => {
    setTargetSearchTerm(event.target.value)
  }
  
  useEffect(() => {
    axios
      .get('https://senior-assassins-backend.aletya.repl.co/students')
      .then((response) => {

        setNames(response.data.map(item => item.name))
        
      })
      .catch((error) => console.log(error));

  }, []);

  
  // on submission, the function sends post request to backend, and navigates away if successful
  function handleSubmit(event){
    event.preventDefault();
    
    axios.post("https://senior-assassins-backend.aletya.repl.co/killRequests", {name1: nameSearchTerm, name2: targetSearchTerm})
      .then(response => {
        navigate("/success")
        console.log(response.data)
      })
      .catch(error => console.log(error))
  }


  return( 
    <form onSubmit={handleSubmit} className="align-left text-center">
      <h3 className="mt-3">Submit a Tag:</h3>
      <div className="Dropdown" style={{display: "flex", flexDirection: "column", margin: "2% 35%", textAlign: "left"}}>
        <div style={{textAlign: "left", padding: "0"}}><strong>Your Name:</strong></div>
        <input type="text" value={nameSearchTerm} onChange={handleNameSearch} placeholder="Search..."/>
          {nameSearchTerm && !names.includes(nameSearchTerm) && filteredNames.map((name, index) => <div className="btn btn-outline-dark" onClick={(event) => {setNameSearchTerm(name)}} key={index}>{name}</div>)}


        <div style={{textAlign: "left", padding: "0"}}><strong>Your Target:</strong></div>
        
        <input type="text" value={targetSearchTerm} onChange={handleTargetSearch} placeholder="Search..."/>
          {targetSearchTerm && !names.includes(targetSearchTerm) && filteredTargets.map((name, index) => <div className="btn btn-outline-dark" onClick={(event) => {setTargetSearchTerm(name)}} key={index}>{name}</div>)}
        
        <input className="mt-3" type="submit"></input>

      </div>
    </form>
  )
} 