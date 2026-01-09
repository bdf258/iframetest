import React, { Component } from "react";
/*global $ */
/*eslint no-undef: "error"*/
class ManageFlags extends Component {
  constructor() {
    super();
    this.state = {
      data: JSON.parse(document.querySelector("script.data").innerText),
      configurations: JSON.parse(
        document.querySelector("script.configurations").innerText
      ),
      usedFlags: new Set(),
    };

    this.submit = this.submit.bind(this);
    this.addRow = this.addRow.bind(this);
  }
  addRow(e) {
    e.preventDefault();
    this.setState((state) => {
      return {
        data: state.data,
        configurations: [
          ...state.configurations,
          {
            flags: [],
            topic: "",
          },
        ],
      };
    });
  }

  componentDidMount() {
    this.setState((state) => {
      const usedFlags = state.usedFlags;
      state.configurations.forEach((configuration) =>
        configuration.flags.forEach((flag) => usedFlags.add(flag))
      );

      return {
        data: state.data,
        configurations: state.configurations,
        usedFlags,
      };
    });
    var target = document.querySelector("form.configurations");
    const vm = this;
    if (target) {
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation && mutation.addedNodes) {
            for (var i = 0; i < mutation.addedNodes.length; ++i) {
              const flagsField =
                mutation.addedNodes[i].querySelector("select.flags");
              const selectField =
                mutation.addedNodes[i].querySelector("select.topics");
              vm.initFlagsField(flagsField);
              vm.initTopicsField(selectField);
            }
          }
        });
      });
      observer.observe(target, {
        childList: true,
      });
    }
    const flagsFields = document.querySelectorAll("select.flags");
    const topicsFields = document.querySelectorAll("select.topics");
    flagsFields.forEach((field) => this.initFlagsField(field));
    topicsFields.forEach((field) => this.initTopicsField(field));
  }

  initFlagsField(flagsField) {
    const vm = this;
    $(flagsField)
      .select2()
      .on("change", (event) => {
        const target = event.target;
        this.setState((state) => {
          return {
            data: state.data,
            configurations: [
              ...state.configurations.filter(
                (configuration, index) => index !== +target.dataset.id
              ),
              Object.assign({}, state.configurations[target.dataset.id], {
                flags: Array.from(target.selectedOptions).map(
                  (option) => option.value
                ),
              }),
            ],
            usedFlags: state.usedFlags.add(target.value),
          };
        });
        vm.submit();
      });
  }
  initTopicsField(topicsField) {
    const vm = this;
    $(topicsField)
      .select2({
        tags: true,
      })
      .on("change", (event) => {
        this.setState((state) => {
          return {
            data: state.data,
            configurations: [
              ...state.configurations.filter(
                (conf, index) => index !== +event.target.dataset.id
              ),
              Object.assign({}, state.configurations[event.target.dataset.id], {
                topic: event.target.value,
              }),
            ],
            usedFlags: state.usedFlags,
          };
        });
        if (
          vm.state.data.topics.filter(
            (topic) => topic.id === event.target.value
          ).length === 0
        )
          this.setState((state) => {
            return {
              data: {
                flags: state.data.flags,
                topics: [
                  ...state.data.topics,
                  {
                    id: event.target.value,
                    topic: event.target.value,
                  },
                ],
              },
              configurations: state.configurations,
              usedFlags: state.usedFlags,
            };
          });
        vm.submit();
      });
  }

  submit() {
    $.post(
      "aj_flagsToTopic.php",
      JSON.stringify(this.state.configurations),
      () => {},
      "json"
    );
  }
  remove(index, evt) {
    evt.preventDefault();
    if (this.state.configurations[index].topic === "") return;

    const vm = this;

    $.ajax({
      url: "aj_flagsToTopic.php",
      method: "DELETE",
      data: JSON.stringify({ topicId: this.state.configurations[index].topic }),
      dataType: "json",
      success() {
        vm.setState((state) => {
          const usedFlags = state.usedFlags;
          state.configurations[index].flags.forEach((flag) => {
            usedFlags.delete(flag);
          });
          return {
            data: state.data,
            usedFlags,
            configurations: [
              ...state.configurations.filter((conf, id) => id !== index),
            ],
          };
        });
        const topicsFields = document.querySelectorAll("select.topics");
        setTimeout(() => {
          vm.state.configurations.forEach((configuration, index) => {
            $(topicsFields[index]).select2().val($(topicsFields[index]).val());
          });
        });
      },
    });
  }
  availableFlags(preselectFlags) {
    return this.state.data.flags.filter(
      (flag) =>
        !this.state.usedFlags.has(flag.ID) ||
        preselectFlags.indexOf(flag.ID) !== -1
    );
  }

  render() {
    return (
      <form className="configurations" onSubmit={this.submit}>
        {this.state.configurations.map((configuration, index) => (
          <div key={index}>
            <select multiple className="flags" data-id={index}>
              {this.availableFlags(configuration.flags).map((flag) => (
                <option
                  key={flag.ID}
                  value={flag.ID}
                  selected={configuration.flags.includes(flag.ID)}
                >
                  {flag.flag}
                </option>
              ))}
            </select>
            <select className="topics" data-id={index}>
              <option>-- Select a topic or type to create a new one --</option>
              {this.state.data.topics.map((topic) => (
                <option
                  key={topic.id}
                  value={topic.id}
                  selected={configuration.topic === topic.id}
                >
                  {topic.topic}
                </option>
              ))}
            </select>
            {configuration.topic !== "" && (
              <button onClick={(e) => this.remove(index, e)} className="btn">
                Delete Topic
              </button>
            )}
          </div>
        ))}
        <button className="btn" onClick={this.addRow}>
          Add New Row
        </button>
      </form>
    );
  }
}

export default ManageFlags;
