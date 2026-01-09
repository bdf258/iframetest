/*global $ */
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

function Form() {
  const data = JSON.parse(document.querySelector("script.data").innerText);
  useEffect(() => {
    $(document).trigger("componentReady");
  }, [data]);
  return (
    <div className="sortable">
      {data.map((filter) => (
        <Filter key={filter.ID} filter={filter}></Filter>
      ))}
    </div>
  );
}

function Filter(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    setCategories(() =>
      JSON.parse(document.querySelector("script.categories").innerText)
    );
    $(document).on("categoriesUpdate", (event, category) => {
      category = JSON.parse(category);
      setCategories((categories) =>
        categories.find((item) => +item.id == +category.id) === undefined
          ? [...categories, category]
          : categories
      );
    });
  }, []);
  return (
    <div className="card ui-state-default" data-id={props.filter.ID}>
      <div className="col-half">
        <h3>
          <span className="id">{props.filter.orderNo}</span> -
          <span className="title"> {props.filter.name} </span>
        </h3>
      </div>
      <div className="col-half">
        <select
          name="category"
          data-id={props.filter.ID}
          value={props.filter.category_id || 0}
        >
          <option value=""></option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.shape({
    ID: PropTypes.string,
    orderNo: PropTypes.string,
    name: PropTypes.string,
    category_id: PropTypes.string,
  }),
};
export default Form;
export { Filter };
