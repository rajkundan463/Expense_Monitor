
import { useEffect,useState } from "react";
import api from "../api/axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from "chart.js";
ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

export default function Analytics(){
  const [data,setData]=useState([]);

  useEffect(()=>{
    api.get("/expenses").then(res=>setData(res.data.data||[]));
  },[]);

  const chartData={
    labels:data.map(e=>e.category),
    datasets:[{
      label:"Expense",
      data:data.map(e=>e.amount/100)
    }]
  };

  return (
    <div>
      <h1>Analytics</h1>
      <div className="glass card">
        <Bar data={chartData}/>
      </div>
    </div>
  );
}
