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
  const [newBillName, setNewBillName] = useState("");
  const [newBillAmount, setNewBillAmount] = useState(0);
  const [updated, setUpdated] = useState(false);

  // every budget update, bills gets subtracted from budget
  // whole bills array gets recalculated - no memoization


  const updateBudget = () => {
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
  }

  useEffect(() => {
    updateBudget();
  }, [budget])

  const handleOnBillUpdate = (e: any, bill: any) => {
    axios.put(`http://localhost:8000/api/budgeter/${bill._id}`,
      {
        name: bill.name,
        amount: e.target.value
      })
      .then(() => {
        updateBudget();
      })
    // input will receive an id and update that id in API
    console.log("updating one bill");
  }

  const handleOnNewBill = (e: any) => {
    e.preventDefault();
    console.log("adding new bill");
    console.log(newBillName);
    console.log(newBillAmount);
    axios.post("http://localhost:8000/api/budgeter/",
      {
        name: newBillName,
        amount: newBillAmount
      }).then(() => {
        updateBudget();
      });
  }

  const handleOnBillDelete = (id: string) => {
    axios.delete("http://localhost:8000/api/budgeter/" + id)
      .then(() => {
        updateBudget();
      })
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
      <form onSubmit={(e) => { handleOnNewBill(e) }}>
        <input placeholder="bill name" onChange={(e: any) => { setNewBillName(e.target.value) }}></input>
        <input placeholder="billing ammount" onChange={(e: any) => { setNewBillAmount(e.target.value) }}></input>
        <button type="submit">submit</button>
      </form>
      {bills.map((bill: any) => {
        return (
          <div key={bill._id}>
            {bill.name} : $<input type="number" value={bill.amount} onChange={(e) => { handleOnBillUpdate(e, bill) }}></input>
            <button onClick={() => { handleOnBillDelete(bill._id) }}>Delete</button>
          </div>
        )
      })}


    </div>
  )
}

export default App
