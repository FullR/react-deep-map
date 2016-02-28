# react-deep-map

Deeply transform a React element tree.

## Example

`npm install react-deep-map`


```javascript
import React from "react";
import reactDeepMap from "react-deep-map";

// replace all instances of "&" in classNames with `blockName`
function amp(blockName, tree) {
  return reactDeepMap(tree, (el) => {
    if(el && el.props && el.props.className && el.props.className.indexOf("&") !== -1) {
      return React.cloneElement(el, {
        className: el.props.className.replace("&", blockName)
      });
    } else {
      return el;
    }
  });
}

export default class Thing extends React.Component {
  render() {
    return amp("Thing",
      <div className="&">
        <h1 className="&__title">{this.props.title}</h1>
        <button className="&__btn">Click Me</button>
      </div>
    );
  }
}

```