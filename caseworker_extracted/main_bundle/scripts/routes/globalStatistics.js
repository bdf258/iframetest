import $ from "jquery";
import api from "../api/protected.index";
/* global Chart */

export default {
  init() {
    const tableHeader = `<table style='padding: 5px; width: 100%; margin-top: 1em;'>
        <tr>
          <td></td>
          <td class='border' style='text-align: center;font-weight:bold;'>Behalf Of
          </td>
          <td class='border' style='text-align: center;font-weight:bold;'>Percentage
          </td>
        </tr>`;
    const tableEnd = `</table>`;

    let colors = [
      "#698e02",
      "#67bbdf",
      "#f19c5c",
      "#e2736e",
      "#f2d439",
      "#ce467b",
      "#339388",
      "#97cc04",
      "#949494",
      "#ab9475",
      "#a65c24",
      "#993833",
    ];
    $("#piechart").bind(
      "jqplotDataClick",
      async function (ev, seriesIndex, pointIndex, data) {
        $("#drill-down").show();
        var caseType = data[2];
        const MPs = [];
        const noOfCases = [];
        const stats = await api.getCasesStatistics(caseType);
        stats.forEach((stat) => {
          MPs.push(stat.x);
          noOfCases.push(stat.y);
        });
        new Chart($("#behalf-chart"), {
          type: "pie",
          responsive: true,
          data: {
            datasets: [
              {
                data: noOfCases,
                backgroundColor: colors,
              },
            ],
            labels: MPs,
          },
        });
        const totalCases = noOfCases.reduce(
          (acc, cur) => acc + parseInt(cur),
          0
        );
        const tableRows = stats.reduce(
          (html, stat) =>
            html +
            `<tr>
            <td></td>
            <td class='border' style='text-align: center'>${stat.x}</td>
            <td class='border' style='text-align: center'>${(
              (stat.y / totalCases) *
              100
            ).toFixed(2)}</td>
          </tr>`,
          ""
        );

        $("#drillDownTable").html(tableHeader + tableRows + tableEnd);
      }
    );
  },
};
