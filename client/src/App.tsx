import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState(0)
  const [budget, setBudget] = useState(0);
  const [availableMoney, setAvailableMoney] = useState(0);
  const [bills, setBills] = useState([]);


  // every budget update, bills gets subtracted from budget
  // whole bills array gets recalculated - no memoization



  useEffect(() => {
    axios.get("http://localhost:8000/api/budgeter/")
      .then(res => {
        console.log(res.data);
        setBills(res.data);
      })
      .catch(err => {
        console.log(err)
      })

    let newBudget = budget;
    bills.map((oneBill: any) => {
      newBudget -= oneBill.amount;
    })
    console.log("Updated budget: " + newBudget);
    setAvailableMoney(newBudget);
  }, [budget])

  const handleOnBillUpdate = () => {
    // input will receive an id and update that id in API
    console.log("updating one bill");
  }

  return (
    <div className="App">
      <h1>Budget: $<input
        type="number"
        placeholder="500"
        onChange={(e: any) => { setBudget(e.target.value * 1); }}
        style={{
          border: "none",
          background: "none",
          fontSize: "32pt",
          fontFamily: "inherit",
          width: "240px"
        }}></input></h1>

      <h1>AvailableMoney: {availableMoney}</h1>
      <h1>Bills:</h1>
      <input placeholder='new bill'></input>
      {bills.map((bill: any) => {
        return (
          <div>
            {bill.name} : $<input type="number" value={bill.amount} onChange={() => { handleOnBillUpdate() }}></input>

          </div>
        )
      })}


    </div>
  )
}

export default App
