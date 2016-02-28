const expect = require("chai").expect;
const React = require("react");
const reactDeepMap = require("./index");

describe("react-deep-map", () => {
  it("should be able to replace every element in a React element tree", () => {
    const tree = React.createElement("div", {className: "a"},
      React.createElement("span", {className: "b"}, React.createElement("div", {className: "c"})),
      React.createElement("span", {className: "b"}, React.createElement("div", {className: "c"})),
      React.createElement("span", {className: "b"}, React.createElement("div", {className: "c"}))
    );

    const newTree = reactDeepMap(tree, (el, depth) => {
      return React.cloneElement(el, {
        className: el.props.className.toUpperCase() + "-" + depth
      });
    });

    expect(newTree).to.not.equal(tree);
    expect(newTree.props.className).to.be.equal("A-0");
    React.Children.forEach(newTree.props.children, (childEl) => {
      expect(childEl.props.className).to.be.equal("B-1");

      React.Children.forEach(childEl.props.children, (childEl) => {
        expect(childEl.props.className).to.be.equal("C-2");
      });
    });
  });

  it("should handle strings", () => {
    const out = reactDeepMap("foo", (v) => v.toUpperCase());
    expect(out).to.be.equal("FOO");
  });

  it("should handle null", () => {
    const out = reactDeepMap(null, (v) => v || "falsy");
    expect(out).to.be.equal("falsy");
  })
});