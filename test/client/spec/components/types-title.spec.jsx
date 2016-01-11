/**
 * Client tests
 */
import React from "react";
import TestUtils from 'react-addons-test-utils';
import Title from "client/components/types-title";

// Use `TestUtils` to inject into DOM, simulate events, etc.
// See: https://facebook.github.io/react/docs/test-utils.html

describe("components/types-title", function () {

  it("sets a title with deep render", function () {
    // This is a "deep" render that renders children + all into an actual
    // browser DOM node.
    //
    // https://facebook.github.io/react/docs/test-utils.html#renderintodocument
    const rendered = TestUtils.renderIntoDocument(<Title title="Deep Title" />);

    // This is a real DOM node to assert on.
    //
    // HACKY: The outer `span` is first, then three children.
    //        Real tests should use specific selectors.
    const renderedComponents = TestUtils
      .scryRenderedDOMComponentsWithTag(rendered, "span");
    const node = React.findDOMNode(renderedComponents[2]);

    expect(node).to.have.property("innerHTML", "Deep Title");
  });

  it("sets a title with shallow render", function () {
    // This is a "shallow" render that renders only the current component
    // without using the actual DOM.
    //
    // https://facebook.github.io/react/docs/test-utils.html#shallow-rendering
    const renderer = TestUtils.createRenderer();
    renderer.render(<Title title="Shallow Title" />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("span");

    // HACKY: The second child is known to be the title node.
    //        Real tests should use specific selectors / identifiers.
    expect(output.props.children)
      .to.have.length(3).and
      .to.have.deep.property("[1].props.children", "Shallow Title");
  });
});
