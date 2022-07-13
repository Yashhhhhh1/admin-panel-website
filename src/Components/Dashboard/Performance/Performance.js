import React, { useEffect } from 'react';
import style from "./Performance.module.css";
import { connect } from 'react-redux';
import {  Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, PieController, ArcElement, Title, Tooltip, Legend, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, PieController, ArcElement, Title, Tooltip, Legend);


function Performance({ dataList }) {
  
  const performanceData = {
    labels: Object.keys(dataList.data.dasbhoardPage.performance),
    datasets: [
      {
        label: "# of Hits",
        data: Object.values(dataList.data.dasbhoardPage.performance),
        fill: true,
        barThickness: 4,
        backgroundColor: [
          "#E95F50",
          "#4DCCB3",
          "#A8D582",
          "#D7D768",
          "#9D66CC",
          "#DB9C3F",
          "#3985F1",
        ],
        borderColor: [
          "#E95F50",
          "#4DCCB3",
          "#A8D582",
          "#D7D768",
          "#9D66CC",
          "#DB9C3F",
          "#3985F1",
        ],
        borderWidth: 0,
      },
    ],
  };
  const Baroption = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "white" },
      },
      x: {
        ticks: { color: "white" },
      },
    },
    indexAxis: "y",
  }

  useEffect(() => {

  }, [dataList.data])


  return (
    <div id={style.performanceChartContainer}>
      <h2>Performance</h2>
      <Bar
            data={performanceData}
            // className={styles.chartBar}
            options={Baroption} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    dataList: state.fetchReducer
  }
}

export default connect(mapStateToProps)(Performance);