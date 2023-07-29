import React from "react";
import { render, screen } from "@testing-library/react";
import ShowAlert from "./ShowAlert";

it("renders without crashing", function() {
  render(<ShowAlert />);
});

it("matches snapshot for error", function() {
  let messages = ["broken"];
  const { asFragment } = render(<ShowAlert type="error" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot for success", function() {
  let messages = ["success"];
  const { asFragment } = render(<ShowAlert type="success" messages={messages} />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders message correctly on the page", function() {
    let messages = ["show this message"];
    render(<ShowAlert type="success" messages={messages}/>);
    expect(screen.getByText('show this message')).toBeInTheDocument();
  });