/*global $ */
import React, { Suspense } from "react";

import ReactDOM from "react-dom";

const Form = React.lazy(() => import("../components/SegmentFilters.jsx"));

export default {
  init() {
    const wrapper = document.getElementById("application");
    wrapper
      ? ReactDOM.render(
          <Suspense fallback={<div>Loading ...</div>}>
            <Form />
          </Suspense>,
          wrapper
        )
      : false;
  },
  finalize() {
    $(document).on("componentReady", () => {
      $(".sortable").sortable({
        update: function () {
          var cards = $(".card");
          var order = [];
          cards.each((index, item) => {
            order.push(item.dataset.id);
          });
          $.post(
            "aj_orderSegmentFilters.php",
            {
              order: order,
            },
            function () {
              var cards = $(".card");
              cards.each((index, item) => {
                $("span.id", item).text(index + 1);
              });
            },
            "json"
          );
        },
      });
      $(".sortable").disableSelection();

      $(document).on("click", ".card .title", function () {
        var title = $(this).text();
        var id = $(this).parents(".card").data("id");
        $(this).replaceWith(
          '<input class="title-editor" value="' +
            title +
            '" data-id="' +
            id +
            '">'
        );
      });

      $(document).on("blur", ".title-editor", function () {
        var id = $(this).data("id");
        var newTitle = $(this).val();
        var field = $(this);
        $.post(
          "aj_updateSegment.php",
          {
            title: newTitle,
            id: id,
          },
          function () {
            field.replaceWith('<span class="title">' + newTitle + "</span>");
          },
          "json"
        );
      });

      $("select")
        .select2({
          tags: true,
          placeholder: "Select a category or type to create a new one",
        })
        .on("change.select2", (el) => {
          $.post(
            "aj_segmentFilterCategory.php",
            {
              id: el.target.dataset.id,
              category: el.target.value,
            },
            (response) => $(document).trigger("categoriesUpdate", response)
          );
        });
    });
  },
};
