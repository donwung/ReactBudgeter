import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [budget, setBudget] = useState(0);
  const [availableMoney, setAvailableMoney] = useState(budget);

  const calculateAvailableMoney = (budget: number) => {

    setAvailableMoney(budget);
  }

  const handleOnBudgetChange = (e: any) => {
    console.log(e.target.value);
    setBudget(e.target.value);
    calculateAvailableMoney(budget);
  }

  return (
    <div className="App">
      <h1>Budget: $<input
        type="number"
        placeholder="500"
        onChange={(e) => { handleOnBudgetChange(e) }}
        style={{
          border: "none",
          background: "none",
          fontSize: "32pt",
          fontFamily: "inherit",
          width: "240px"
        }}></input></h1>

      <h1>AvailableMoney: {availableMoney}</h1>


    </div>
  )
}

export default App
