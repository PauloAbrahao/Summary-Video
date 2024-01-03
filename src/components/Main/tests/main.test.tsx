import { render, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Index from "../index";

describe("Main Component test", async () => {
  it("should be null initially", () => {
    const { getByPlaceholderText } = render(<Index />);

    // check if the input value is null initially
    const inputElement = getByPlaceholderText(
      "Cole a URL do Youtube aqui"
    ) as HTMLInputElement;
    expect(inputElement).not.toBeNull();
    expect(inputElement.value).toBe("");
  });

  it("should be able to change the input value", async () => {
    const { getByPlaceholderText } = render(<Index />);

    const inputElement = getByPlaceholderText(
      "Cole a URL do Youtube aqui"
    ) as HTMLInputElement;
    expect(inputElement).not.toBeNull();

    // simulate the input change
    fireEvent.input(inputElement, {
      target: { value: "https://youtu.be/NEW_VIDEO_ID" },
    });

    // check if the input value has changed correctly
    expect(inputElement.value).toBe("https://youtu.be/NEW_VIDEO_ID");
  });

  it("should activate the border-red-500 property in the input when the button is pressed with the input empty", async () => {
    const { getByPlaceholderText, getByText } = render(<Index />);

    // find the input and the button
    const inputElement = getByPlaceholderText("Cole a URL do Youtube aqui");
    const buttonElement = getByText("Gerar resumo");

    // Check that the input is present in the initial rendering and does not have the class border-red-500
    expect(inputElement).not.toBeNull();
    expect(inputElement).not.toHaveClass("border-red-500");

    // Simulate user interaction by pressing the button with empty input
    fireEvent.click(buttonElement);

    // Check if the border-red-500 class has been applied to the input
    expect(inputElement).toHaveClass("border-red-500");
  });

  it("should display an empty rectangle initially.", async () => {
    const { getByTestId } = render(<Index />);

    const divElement = getByTestId("rectangle");

    expect(divElement).toHaveClass("border-dashed");
    expect(divElement).toHaveClass("border-slate-800");
  });
});
