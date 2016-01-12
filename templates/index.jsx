/*eslint max-len:[2,120,2]*/
/**
 * Server-side template
 * --------------------
 *
 * **Note**: We lint this as client code but import it only into node-land.
 */
import React from "react";

// CloudFlase base url.
const CLOUDFLARE = "//cdnjs.cloudflare.com/ajax/libs";

// A naive whitespace stripper to help with ES6 strings.
const strip = (text) => text.replace(/^\s*|\s*$/gm, "").replace(/\n/g, "");

export default class Index extends React.Component {
  render() {
    return (
      // Unfortunately, no easy way to do: `<!DOCTYPE html>` within a render,
      // so have to manually do it outside in the server after render to string.
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          {/* Polyfills before CSS */}
          <meta
            name="ie-shiv-polyfill"
            dangerouslySetInnerHTML={{__html:
            strip(`<!--[if lt IE 9]>
              <script src="${CLOUDFLARE}/html5shiv/3.7.2/html5shiv-printshiv.js"></script>
            <![endif]-->`)}}
          />

          <link rel="stylesheet" href={this.props.bundles.css} />

          <title>Converter</title>
        </head>
        <body>
          <div className="js-content"
            dangerouslySetInnerHTML={{__html: this.props.content}}
          />

          {/* Polyfills before JS */}
          <span dangerouslySetInnerHTML={{__html:
            strip(`<!--[if lt IE 9]>
              <script src="${CLOUDFLARE}/jquery/1.11.3/jquery.min.js"></script>
              <script src="${CLOUDFLARE}/es5-shim/4.1.1/es5-shim.min.js"></script>
              <script src="${CLOUDFLARE}/es5-shim/4.1.1/es5-sham.min.js"></script>
            <![endif]-->`)
          }}
          />

          {/* Application JS */}
          {(this.props.render.js && this.props.bootstrap) ?
            <script className="js-bootstrap" type="application/json"
              dangerouslySetInnerHTML={{__html: this.props.bootstrap}}
            /> : ""}
          {this.props.render.js ? <script src={this.props.bundles.js} /> : ""}
        </body>
      </html>
    );
  }
}

Index.propTypes = {
  bootstrap: React.PropTypes.string,
  bundles: React.PropTypes.shape({
    js: React.PropTypes.string,
    css: React.PropTypes.string
  }),
  content: React.PropTypes.string,
  render: React.PropTypes.shape({
    js: React.PropTypes.bool
  })
};
