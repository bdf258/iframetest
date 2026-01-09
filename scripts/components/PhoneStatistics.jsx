/* global $ */
import React, { Component } from "react";
import Overview from "./SurveysOverview.jsx";
import SurveyDetails from "./SurveyDetails.jsx";

class PhoneStatistics extends Component {
  constructor() {
    super();
    const jwt = { token: window.localStorage.getItem("token") };
    this.state = {
      surveys: [],
      totals: [],
      selectedSurvey: 0,
      token: jwt.token,
      loaded: false,
    };

    this.selectSurvey = this.selectSurvey.bind(this);
    this.deselectSurvey = this.deselectSurvey.bind(this);
  }

  componentDidMount() {
    const component = this;
    $.ajax({
      url: "/api/ajax/phone/stats/all",
      beforeSend: function (xhr) {
        //Include the bearer token in header
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + component.state.token
        );
      },
      dataType: "json",
      success(response) {
        component.setState(response);
        component.setState((state) =>
          Object.assign({}, state, { loaded: true })
        );
      },
    });
  }

  selectSurvey(index) {
    this.setState((state) => {
      return Object.assign({}, state, { selectedSurvey: +index });
    });
  }

  deselectSurvey(e) {
    e.preventDefault();
    this.setState((state) => {
      return Object.assign({}, state, { selectedSurvey: 0 });
    });
  }

  render() {
    const SurveyComponent =
      this.state.selectedSurvey === 0 ? Overview : SurveyDetails;
    return (
      <div>
        <SurveyComponent
          surveys={this.state.surveys}
          totals={this.state.totals}
          selectedSurvey={this.state.selectedSurvey}
          token={this.state.token}
          loaded={this.state.loaded}
          selectSurvey={this.selectSurvey}
          deselectSurvey={this.deselectSurvey}
        ></SurveyComponent>
      </div>
    );
  }
}

export default PhoneStatistics;
