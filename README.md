[![Travis build status][travis-badge]][travis-build]
[![Codecov branch][codecov-badge]][codecov]
[![npm][npm-badge]][npm-version]
[![downloads][downloads-badge]][npmcharts]
[![MIT License][license-badge]][license]

[![gzip size][gzip-badge]][unpkg]
[![size][size-badge]][unpkg]

[![Maintainability][code-climate-badge]][code-climate]
[![PRs Welcome][pull-request-badge]](http://makeapullrequest.com)

# react-idled 😴

A React component that notifies you when the user is idle.

# Getting started

```shell
npm install --save react-idled
```

# Why?

This is a copy of [`react-idle`](https://github.com/ReactTraining/react-idle).

When the user is idle, you can do things like preload code-split bundles, download images that haven't been scrolled to, automatically log users out of a sensitive website, etc.

# API

| Props                          | Description                                                                                                       | Default                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| defaultIdle                    | (**Boolean**) Does component start of as idle? By default, we assume that loading the page is a user interaction. | _false_                                                           |
| [render](#render-function)     | (**Function**) [A render prop](https://reactjs.org/docs/render-props.html) function                               | _() => {}_                                                        |
| [onChange](#onchange-function) | (**Function**) Called whenever the user's idle state changes.                                                     | _() => {}_                                                        |
| timeout                        | (**Number**) The time it takes for the user to be idle, in milliseconds                                           | _1000_                                                            |
| events                         | (**Array**) An array of window events to listen for user activity                                                 | _[ "mousemove", "mousedown", "keydown", "touchstart", "scroll" ]_ |

## render function

The `render` prop is a function that is called with the following arguments.

| Name | Description                                  |
| ---- | -------------------------------------------- |
| idle | A boolean that tells you if the user is idle |

## onChange function

The `onChange` prop is a function that is called with the following arguments.

| Name | Description                                  |
| ---- | -------------------------------------------- |
| idle | A boolean that tells you if the user is idle |

```jsx
import React from "react";
import Idled from "react-idle";

class App extends React.Component {
  handleChange = ({ idle }) => {
    console.log("Is user idle?", idle);
  };

  render() {
    return (
      <Idled
        onChange={this.handleChange}
        timeout={1500}
        render={({ idle }) => <h1>{idle ? "*whistles*" : "Woah what now?"}</h1>}
      />
    );
  }
}
```

[codecov]: https://codecov.io/gh/newyork-anthonyng/react-idled
[codecov-badge]: https://img.shields.io/codecov/c/github/newyork-anthonyng/react-idled/master.svg
[code-climate]: https://codeclimate.com/github/newyork-anthonyng/react-idled/maintainability
[code-climate-badge]: https://api.codeclimate.com/v1/badges/faefec967ef40a030c3e/maintainability
[downloads-badge]: https://img.shields.io/npm/dm/react-idled.svg?style=flat-square
[license]: https://github.com/newyork-anthonyng/react-idled/blob/master/LICENSE
[license-badge]: https://img.shields.io/npm/l/react-idled.svg?style=flat-square
[npmcharts]: https://npmcharts.com/compare/react-idled
[npm-version]: https://www.npmjs.com/package/react-idled
[npm-badge]: https://img.shields.io/npm/v/react-idled.svg?style=flat-square
[pull-request-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[travis-badge]: https://travis-ci.org/newyork-anthonyng/react-idled.svg?branch=master
[travis-build]: https://travis-ci.org/newyork-anthonyng/react-idled
[gzip-badge]: http://img.badgesize.io/https://unpkg.com/react-idled?compression=gzip&label=gzip%20size&style=flat-square
[size-badge]: http://img.badgesize.io/https://unpkg.com/react-idled?label=size&style=flat-square
[unpkg]: https://unpkg.com/react-idled
