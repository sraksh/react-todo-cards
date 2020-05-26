import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      item: {
        wentWell: [],
        toImprove: [],
        startDoing: [],
        actionItems: []
      }
    };
  }

  addItem = params => {
    var newState = Object.assign({}, this.state);
    var key = Date.now();
    newState.item[params].push({ value: "", key: key });
    this.setState(newState);
  };

  onEnterText = (event, item, type) => {
    if (event.key == "Enter") {
      event.target.blur();
    }
    this.saveText(event, item, type);
  };

  saveText = (event, item, type) => {
    var newState = Object.assign({}, this.state);
    newState.item[type].map(listItem => {
      if (listItem.key === item.key) {
        listItem.value = event.target.value;
      }
    });
    this.setState(newState);
  };

  renderCards = (item, type) => {
    return (
      <textarea
        onKeyDown={event => this.onEnterText(event, item, type)}
        className={"card-item-" + type}
        key={item.key}
      />
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="card-container">
          <div className="card-content">
            <div className="section-title">
              What went well
              <button onClick={() => this.addItem("wentWell")}>+</button>
            </div>
            <div className="task-wrapper">
              {this.state.item.wentWell.map(item =>
                this.renderCards(item, "wentWell")
              )}
            </div>
          </div>
          <div className="card-content">
            <div className="section-title">
              What can be improved
              <button onClick={() => this.addItem("toImprove")}>+</button>
            </div>
            <div className="task-wrapper">
              {this.state.item.toImprove.map(item =>
                this.renderCards(item, "toImprove")
              )}
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card-content">
            <div className="section-title">
              Start doing
              <button onClick={() => this.addItem("startDoing")}>+</button>
            </div>
            <div className="task-wrapper">
              {this.state.item.startDoing.map(item =>
                this.renderCards(item, "startDoing")
              )}
            </div>
          </div>
          <div className="card-content">
            <div className="section-title">
              Action items
              <button onClick={() => this.addItem("actionItems")}>+</button>
            </div>
            <div className="task-wrapper">
              {this.state.item.actionItems.map(item =>
                this.renderCards(item, "actionItems")
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

render(<App />, document.getElementById("root"));
