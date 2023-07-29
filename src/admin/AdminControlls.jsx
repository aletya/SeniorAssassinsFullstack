
import {useState, useEffect} from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'




export default function AdminControlls() {

  // state for the data from backend
  // state for the loading
  const [requestKillData, setRequestKillData] = useState([]);
  const [loading, setLoading] = useState(
    <div>
      <ReactLoading type="bubbles" color="#000000" margin/>
    </div>
  )
    

  // gets all current kill requests from backend, stores in data state
  useEffect(() => {
    axios
      .get('https://senior-assassins-backend.aletya.repl.co/killRequests')
      .then((response) => {
        setRequestKillData(response.data);
        setLoading();
        
      })
      .catch((error) => console.log(error));
    
  }, []);

  
  // first removes given submission from state, then removes the kill request from the db
  const removeFromSight = (objectToRemove) => {
    setRequestKillData(
      requestKillData.filter(item => item._id != objectToRemove._id)
    )

     axios
      .delete('https://senior-assassins-backend.aletya.repl.co/killRequests/' + objectToRemove._id)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error));
  }

  // removes kill request then submits a kill to backend
  const submitKill = (objectToSubmit) => {
    removeFromSight(objectToSubmit)

    axios
      .post('https://senior-assassins-backend.aletya.repl.co/kill', objectToSubmit)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error));
    
  }
    
  // maps backend data to an array of html components 
  // each kill request has a killer, victim, and a yes/no option
  
  let requestKillHTML = requestKillData.map((item, key) => {
    return(
      <div key={key} className="row">
        <div className="col">{item.name1}</div>
        <div className="col">{item.name2}</div> 
        <div className="col">
          <button onClick={() => {submitKill(item)}}>Confirm</button>
          <button onClick={() => {removeFromSight(item)}}>Deny</button>
        </div>
      </div>
    )
  })

  const HeaderRow = () => {
    return (
      <div className="row header-row">
        <div className="col">Killer</div>
        <div className="col">Victim</div>
        <div className="col">Actions</div>
      </div>
    );
  };

  // The loading will show until the get request is returned
  return (
    <div className="">
      {loading}
      <HeaderRow />
      {requestKillHTML}
    </div>
  )
}
