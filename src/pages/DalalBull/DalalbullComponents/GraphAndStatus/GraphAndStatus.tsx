import React, { FunctionComponent } from "react";
import { Line } from "react-chartjs-2";
import "./GraphAndStatus.scss";

const data = {
  labels: [],
  datasets: [
    {
      data: [],
      label: "Price",
      borderColor: "#469afa",
      fill: false,
      lineTension: 0,
    },
  ],
};

const options = {
  tooltips: {
    displayColors: false,
    backgroundColor: "black",
    enabled: true,
    mode: "single",
    bodyFontSize: 15,
    bodyFontFamily: "Gamja Flower",
    bodyFontColor: "white",
    yPadding: 5,
    xPadding: 15,
    cornerRadius: 4,
    bodyFontStyle: "bold",
  },
  scales: {
    yAxes: [
      {
        gridLines: {
          drawBorder: true,
          color: "grey",
          zeroLineColor: "white",
        },
        ticks: {
          fontColor: "white",
          fontFamily: "Gamja Flower",
          fontSize: 15,
          fontStyle: "bold",
          beginAtZero: false
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          drawBorder: true,
          color: "grey",
          zeroLineColor: "white",
        },
        ticks: {
          fontColor: "white",
          fontFamily: "Gamja Flower",
          fontSize: 12,
          fontStyle: "bold",
        },
      },
    ],
  },
};

const GraphAndStatus = (props: any) => {
  let new_label: any = [];
  let new_data: any = [];
  if (props.graphData) {
    props.graphData.map((gdata: any) => {
      new_label.push(Math.round(gdata[0] / 60));
      new_data.push(gdata[1]);
    });
  }
  // new_label = ['1', '2', '3', '4', '5', '6']
  // new_data = [12, 19, 3, 5, 2, 3]
  data.labels = new_label;
  data.datasets[0].data = new_data;
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {},
        },
      ],
    },
  }
  
  return (
    <div className="graph-userdata">
      <div className="inner-flex p-5">
        <h1 className={"stockname"} text-align="center">{props.name}</h1>
        <div className="graph">
          <Line data={data} width={100} height={50} options={options} />
        </div>
      </div>
    </div>
  );
};

export default GraphAndStatus;
