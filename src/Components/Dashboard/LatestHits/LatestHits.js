import React from 'react';
import style from "./LatestHits.module.css";
import { connect } from 'react-redux';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, PieController, ArcElement, Title, Tooltip, Legend, } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, PieController, ArcElement, Title, Tooltip, Legend);


function LatestHitsChart({ dataList }) {
    const latestHit = {
        labels: dataList.data.dasbhoardPage.latestHits.months,
        datasets: [
            {
                label: "Latest hits",
                data: dataList.data.dasbhoardPage.latestHits.latest,
                borderColor: "#4BC0C0",
                lineTension: 0.4,
                pointBorderWidth: 0,
                pointRadius: 0,
            },
            {
                label: "Popular",
                data: dataList.data.dasbhoardPage.latestHits.popular,
                borderColor: "#DD6280",
                lineTension: 0.4,
                pointBorderWidth: 0,
                pointRadius: 0,
            },
            {
                label: "Featured",
                data: dataList.data.dasbhoardPage.latestHits.featured,
                borderColor: "#7D62D0",
                lineTension: 0.4,
                pointBorderWidth: 0,
                pointRadius: 0,
            },
        ],
    };
    const option = {
        plugins: {
            label: "Lists",
            legend: {
                display: true,
                labels: {
                    color: "white",
                },
            },
        },
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                ticks: { color: "white" },
            },
            x: {
                ticks: { color: "white" },
            },
        },
    };

    return (
        <div id={style.latestHitsContainer}>
            <h2>Latest Hits</h2>
            <Line
                data={latestHit}
                options={option}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        dataList: state.fetchReducer
    }
}

export default connect(mapStateToProps)(LatestHitsChart);