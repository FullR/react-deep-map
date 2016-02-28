"use strict";
var React = require("react");

function reactCanMapChildren(el) {
  return el && el.props && el.props.children && typeof el.props.children === "object";
}

module.exports = function reactDeepMap(tree, fn) {
  var context = (this || {root: tree, depth: 0});

  function mapEl(el) {
    var newEl = fn(el, context.depth, context.root);
    if(reactCanMapChildren(newEl)) {
      return React.cloneElement(newEl, {
        children: reactDeepMap.call({root: context.root, depth: context.depth + 1}, newEl.props.children, fn)
      });
    } else {
      return newEl;
    }
  }
  
  if(Array.isArray(tree)) {
    return React.Children.map(tree, mapEl);
  } else {
    return mapEl(tree);
  }
}
