/* eslint-disable */
import React, { Component } from "react";
import { format, parseISO, subMonths } from "date-fns";

import Chart from "chart.js";
import PropTypes from "prop-types";

class SurveyOverview extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const self = this;
    $.ajax({
      url: `/api/ajax/phone/stats/survey/monthly`,
      dataType: "json",
      method: "GET",
      beforeSend(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer " + self.props.token);
      },
      success(data) {
        var labels = {};
        [...Array(12).keys()].reverse().map((month) => {
          const date = subMonths(new Date(), month);
          labels[`${format(date, "MMMM yyyy")}`] = format(date, "yyyy-MM");
        });
        var config = {
          type: "line",
          data: {
            labels: Object.keys(labels),
            datasets: [
              {
                label: "Answered Calls",
                lineTension: 0,
                backgroundColor: "#698e02",
                borderColor: "#698e02",
                data: Object.values(labels).map((date) => {
                  const calls = data.calls.filter((call) => call.date === date);
                  return calls.length > 0 ? +calls[0].count : 0;
                }),
                fill: false,
              },
              {
                label: "Voicemails",
                lineTension: 0,
                fill: false,
                backgroundColor: "#555555",
                borderColor: "#555555",
                data: Object.values(labels).map((date) => {
                  const calls = data.voicemails.filter(
                    (call) => call.date === date
                  );
                  return calls.length > 0 ? +calls[0].count : 0;
                }),
              },
            ],
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: "Calls per month",
            },
            tooltips: {
              mode: "index",
              intersect: false,
            },
            hover: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              xAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Month",
                  },
                },
              ],
              yAxes: [
                {
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: "Value",
                  },
                },
              ],
            },
          },
        };
        var ctx = document.getElementById("details-chart").getContext("2d");
        window.myLine = new Chart(ctx, config);
      },
    });
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Survey</th>
              <th>Total Number of Calls</th>
            </tr>
          </thead>
          <tbody>
            {this.props.totals.length === 0 && !this.props.loaded && (
              <tr>
                <td colSpan="2">Loading Data...</td>
              </tr>
            )}
            {this.props.totals.length === 0 && this.props.loaded && (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
            {this.props.totals.map((surveyData) => (
              <tr key={surveyData.id}>
                <td
                  className="clickable"
                  onClick={() => this.props.selectSurvey(surveyData.id)}
                >
                  {surveyData.survey}
                </td>
                <td>{surveyData.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <canvas id="details-chart"></canvas>
      </div>
    );
  }
}

SurveyOverview.propTypes = {
  totals: PropTypes.array,
  selectSurvey: PropTypes.func,
  token: PropTypes.string,
};

export default SurveyOverview;
