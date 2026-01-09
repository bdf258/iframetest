import React, { Suspense } from "react";

import $ from "jquery";
import ComponentLoading from "../components/ComponentLoading.jsx";
import Providers from "../context/Providers.jsx";
import ReactDom from "react-dom";

const DoorknockUsers = React.lazy(() =>
  import("../components/Doorknock/DoorknockUsers/DoorknockUsers.jsx")
);

export default {
  init() {
    ReactDom.render(
      <Suspense fallback={<ComponentLoading />}>
        <Providers>
          <DoorknockUsers />
        </Providers>
      </Suspense>,
      document.getElementById("app")
    );

    $('.resetVisited [name="date"]').datepicker({
      dateFormat: "dd/mm/yy",
    });
    $(".resetVisited select")
      .select2({
        minimumResultsForSearch: Infinity,
      })
      .change((e) => {
        $(".resetVisited .datepicker").hide();
        if (e.target.value === "date")
          $(".resetVisited .datepicker").show().css("display", "inline-block");
      });

    $(".resetVisited .confirm").on("click", (e) => {
      this.getVisitedCount().then((response) => {
        let confirm = window.confirm(
          `You are about to set the status of ${response.count} households. Do you wish to proceed?`
        );
        if (!confirm) return;
        e.preventDefault();
        const timeframe = $(".resetVisited select").val();
        const date = $('.resetVisited [name="date"]').val();
        $.ajax({
          url: "/api/ajax/doorknocking/resetVisit",
          dataType: "json",
          method: "post",
          data: { timeframe, date },
        });
      });
    });
  },
  getVisitedCount() {
    return new Promise((resolve) => {
      const timeframe = $(".resetVisited select").val();
      const date = $('.resetVisited [name="date"]').val();
      $.ajax({
        url: "/api/ajax/doorknocking/visitedCount",
        dataType: "json",
        method: "post",
        data: { timeframe, date },
        success: (response) => resolve(response),
      });
    });
  },
};
