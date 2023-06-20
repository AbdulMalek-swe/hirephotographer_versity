import axios from 'apiService/axios';
import React, { useEffect, useState }  from 'react';
import { BarChart, Bar,   ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

 
const HiredGraph = () => {
    const [counter,setCounter] = useState([])
    useEffect(()=>{
        axios.get("/photographer")
        .then(res=>{
            console.log(res);
            setCounter(res?.data?.data)
        })
    },[])
    return (
        <div className='-z-10 container mx-auto'>
           <h1 className='text-center text-blue-700 bg-red-800 p-5 text-4xl'>Hire Count in graph</h1>
        <ResponsiveContainer width="100%" aspect={16 / 9}>
            <BarChart
              data={counter}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}

            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis  />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hireCount" fill="#70f174" />

            </BarChart>

          </ResponsiveContainer>
         <RatingGraph counter={counter}/>
        </div>
    );
};

export default HiredGraph;


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const RatingGraph = ({counter})=>{
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  return(
    <>
      <h1 className='text-center text-blue-700 bg-red-800 p-5 text-4xl'>rating</h1>
      <ResponsiveContainer width="100%" height="100%" aspect={16/5}>
        <PieChart width={400} height={400}>
          <Pie
            data={counter}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="rating"
          >
            {counter.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  )
}