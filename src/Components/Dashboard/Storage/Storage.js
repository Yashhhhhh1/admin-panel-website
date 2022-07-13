import React from 'react'
import { connect } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import style from "./Storage.module.css";


ChartJS.register(ArcElement, Tooltip, Legend);


function Storage({ dataList }) {

  const chartData = {
    labels: [
      "Available Storage (9.150GB)",
      "System Storage (6.500GB)",
      "Used Storage (18.240GB)"
    ],
    datasets: [
      {
        label: '# of Votes',
        data: Object.values(dataList.data.dasbhoardPage.storage).reverse(),
        backgroundColor: ["#A8D582", "#4ED6B8", "#FF4229"],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };


  return (
    <div id={style.storageInfoContainer}>
      <h2>Storage Information</h2>
      <div id={style.storageChart}>
        <Pie data={chartData} options={{
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "white",
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          showScale: false,
          radius: 100,
        }} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    dataList: state.fetchReducer
  }
}

export default connect(mapStateToProps)(Storage);