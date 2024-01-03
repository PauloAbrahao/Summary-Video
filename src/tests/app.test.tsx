import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../App";
import React from "react";

describe("App", async () => {
  it("renders headline 'Summary Video' ", () => {
    render(<App />);
    const headline = screen.getByText("Summary Video");
    expect(headline).toBeInTheDocument();
  });
});
