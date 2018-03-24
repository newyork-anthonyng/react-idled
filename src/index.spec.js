import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Idled from "../src";

jest.useFakeTimers();

let node;
const eventMap = {};
beforeEach(() => {
  node = document.createElement("div");

  window.addEventListener = jest.fn((eventName, cb) => {
    eventMap[eventName] = cb;
  });
  window.removeEventListener = jest.fn(eventName => {
    eventMap[eventName] = undefined;
  });
});

afterEach(() => {
  unmountComponentAtNode(node);
});

it("should attach event listeners when mounting", () => {
  render(<Idled />, node, () => {
    expect(eventMap).toMatchSnapshot();
  });
});

it("should remove event listeners when unmounting", () => {
  render(<Idled />, node);
  unmountComponentAtNode(node);

  expect(eventMap).toMatchSnapshot();
});

it("should call onChange function with correct argument when component becomes idle", () => {
  const cb = jest.fn();
  render(<Idled onChange={cb} />, node);

  jest.runAllTimers();

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0][0]).toMatchSnapshot();
});

it("should call onChange function with correct argument when component becomes active", () => {
  const cb = jest.fn();
  render(<Idled onChange={cb} defaultIdle />, node);

  eventMap.mousemove();

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0][0]).toMatchSnapshot();
});

it("should not call onChange function when component is active, and event happens", () => {
  const cb = jest.fn();
  render(<Idled onChange={cb} />, node);

  eventMap.mousemove();

  expect(cb).toHaveBeenCalledTimes(0);
});

it("should call render function with correct argument when component is idle", () => {
  let isIdle;
  render(
    <Idled
      render={({ idle }) => {
        isIdle = idle;
        return null;
      }}
    />,
    node
  );

  jest.runAllTimers();

  expect(isIdle).toEqual(true);
});

it("should call render function with correct argument when component is active", () => {
  let isIdle;
  render(
    <Idled
      render={({ idle }) => {
        isIdle = idle;
        return null;
      }}
    />,
    node
  );

  expect(isIdle).toEqual(false);
});

it("should set default idle state to true", () => {
  let isIdle;
  render(
    <Idled
      defaultIdle
      render={({ idle }) => {
        isIdle = idle;
        return null;
      }}
    />,
    node
  );

  expect(isIdle).toEqual(true);
});

it("should update event listeners correctly", () => {
  render(<Idled />, node);
  render(<Idled events={["foo"]} />, node);

  expect(eventMap).toMatchSnapshot();
});
