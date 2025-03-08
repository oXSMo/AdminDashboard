import React from 'react'
import Header from './Header'
import TotalChart from './TotalChart'
import ItemsTable from './ItemsTable'

function Dashboard() {
  return (
    <div className='w-full space-y-6 grid'>
      <Header />
      <TotalChart />
      <ItemsTable />
    </div>
  )
}

export default Dashboard
