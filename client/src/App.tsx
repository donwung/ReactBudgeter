import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import './App.css';


function App() {
  const [budget, setBudget] = useState(0);
  const [availableMoney, setAvailableMoney] = useState(budget);
  const [amountInBills, setAmountInBills] = useState(0);
  const [allBills, setAllBills] = useState([]);

  const [newBillName, setNewBillName] = useState("");
  const [newBillAmount, setNewBillAmount] = useState("");

  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    console.log("useeffect");
    if (!updated) {
      axios.get("http://localhost:8000/api/budgeter")
        .then((res) => {
          console.log(res.data);
          setAllBills(res.data);
          let totalBillingAmount = 0;
          res.data.map((bill: any) => {
            totalBillingAmount += bill.amount;
          })
          setAmountInBills(totalBillingAmount);
          setAvailableMoney(budget - totalBillingAmount);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    setUpdated(false);
  }, [budget, updated])

  const handleOnSubmitNewBill = (e: any) => {
    e.preventDefault();
    console.log("submitted");
    console.log(newBillName);
    console.log(newBillAmount);
    axios.post("http://localhost:8000/api/budgeter/", { name: newBillName, amount: newBillAmount })
      .then(() => {
        setUpdated(true);
      })
  }

  const handleOnDeleteBill = (id: string) => {
    console.log("deleting");
    axios.delete("http://localhost:8000/api/budgeter/" + id)
      .then(() => {
        console.log("removing...");
      })
      .then(() => {
        console.log("remove success");
        setUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const handleOnUpdateOneBill = (oneBill: any, updatedAmount: number) => {
    console.log("updating bill");
    console.log(updatedAmount)
    axios.put("http://localhost:8000/api/budgeter/" + oneBill._id, { name: oneBill.name, amount: updatedAmount })
      .then(() => {
        console.log("updating...")
      })
      .then(() => {
        console.log("update success");
        setUpdated(true);
      })
      .catch((err) => {
        console.log(err)
      })

  }

  return (
    <div style={{ display: "flex" }}>
      <div>

        <h1>Budget: {budget}</h1>
        <input type="number" onChange={(e: any) => { setBudget(e.target.value) }}></input>
        <h1>Available Money: {availableMoney}</h1>
        <h1>Amount In Bills: {amountInBills}</h1>

        <form onSubmit={(e: any) => { handleOnSubmitNewBill(e) }}>
          <input type="text" placeholder="name" onChange={(e: any) => { setNewBillName(e.target.value) }}></input>
          <input type="number" placeholder="amount" onChange={(e: any) => { setNewBillAmount(e.target.value) }}></input>
          <input type="submit"></input>
        </form>
      </div>
      <div>
        {allBills.map((oneBill: any) => {
          return (
            <div>
              {oneBill.name}:
              <input type="number" value={oneBill.amount} onChange={(e: any) => { handleOnUpdateOneBill(oneBill, e.target.value) }}></input>
              <button onClick={() => { handleOnDeleteBill(oneBill._id) }}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
