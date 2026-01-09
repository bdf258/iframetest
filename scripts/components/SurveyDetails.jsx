/* global $ */
/* eslint-disable jsx-a11y/anchor-is-valid */
import "datatables.net-dt/css/jquery.dataTables.css";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5.min";
import "datatables.net-buttons/js/buttons.print.min";

import React, { Component } from "react";
import PropTypes from "prop-types";

import dt from "datatables.net-dt";

dt(window, $);

class SurveyDetails extends Component {
  constructor() {
    super();
    this.state = {
      survey: [],
      callQueue: [],
      contactDetails: [],
      loaded: false,
      contactsLoaded: false,
    };
  }

  componentDidMount() {
    const self = this;
    const footerSums = (api, columns) => {
      columns.forEach((column) => {
        // total in dataset
        var totalCalls = api
          .column(column)
          .data()
          .reduce(function (a, b) {
            return +a + +b;
          }, 0);

        // Total over this page
        var pageTotalCalls = api
          .column(column, { page: "current" })
          .data()
          .reduce(function (a, b) {
            return +a + +b;
          }, 0);

        $(api.column(column).footer()).html(
          pageTotalCalls + " (" + totalCalls + " total)"
        );
      });
    };
    $.ajax({
      url: `/api/ajax/phone/stats/survey/${self.props.selectedSurvey}`,
      method: "GET",
      dataType: "json",
      beforeSend: function (xhr) {
        //Include the bearer token in header
        xhr.setRequestHeader("Authorization", "Bearer " + self.props.token);
      },
      success(response) {
        self.setState((state) => {
          let newState = Object.assign({}, state, {
            survey: response.surveys.sort((a, b) => b.count - a.count),
          });
          return Object.assign({}, newState, {
            callQueue: response.callQueues.sort((a, b) => b.count - a.count),
            loaded: true,
          });
        });

        $("table.caseworkersStats").DataTable({
          dom: "tip",
          footerCallback: function () {
            var api = this.api();
            footerSums(api, [1, 2, 3, 4]);
          },
        });

        $("table.queueStats").DataTable({
          footerCallback: function () {
            var api = this.api();
            footerSums(api, [2, 3, 4, 5]);
          },
        });
      },
    });
  }

  render() {
    return (
      <div>
        {this.state.survey.length > 0 ? (
          <h4 className="inline-block half">
            {this.state.survey[0].survey} Summary
          </h4>
        ) : (
          <h4 className="inline-block half">Loading Statistics</h4>
        )}
        <a
          href="#"
          className="inline-block half text-right "
          onClick={this.props.deselectSurvey}
        >
          Back to all surveys
        </a>
        <table className="caseworkersStats">
          <thead>
            <tr>
              <th>Caseworker</th>
              <th>Total number of calls</th>
              <th>Emails Collected</th>
              <th>Telephones collected</th>
              <th>Voting Intentions Collected</th>
            </tr>
          </thead>
          <tbody>
            {this.state.survey.length === 0 && !this.state.loaded && (
              <tr>
                <td colSpan="6">Loading Data...</td>
              </tr>
            )}
            {this.state.survey.length === 0 && this.state.loaded && (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
            {this.state.survey.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.caseworker}</td>
                  <td>{entry.count}</td>
                  <td>{entry.emails}</td>
                  <td>{entry.phones}</td>
                  <td>{entry.vis}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>

        {this.state.survey.length > 0 ? (
          <h4 className="inline-block ">
            {this.state.survey[0].survey} Breakdown by call queue
          </h4>
        ) : (
          <h4 className="inline-block">Loading Statistics</h4>
        )}
        <table className="queueStats">
          <thead>
            <tr>
              <th>Call Queue</th>
              <th>Caseworker</th>
              <th>Total number of calls</th>
              <th>Answered Calls</th>
              <th>Voicemails</th>
              <th>Failed Calls</th>
            </tr>
          </thead>
          <tbody>
            {this.state.callQueue.length === 0 && !this.state.loaded && (
              <tr>
                <td colSpan="6">Loading Data...</td>
              </tr>
            )}
            {this.state.callQueue.length === 0 && this.state.loaded && (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
            {this.state.callQueue.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.callQueue}</td>
                  <td>{entry.caseworker}</td>
                  <td>{entry.count}</td>
                  <td>{entry.answered}</td>
                  <td>{entry.voicemails}</td>
                  <td>{entry.failed}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}

SurveyDetails.propTypes = {
  deselectSurvey: PropTypes.func,
};

export default SurveyDetails;
