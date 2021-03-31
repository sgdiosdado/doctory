import React from "react"
import { screen } from "@testing-library/react"
import { render } from "./test-utils"
import { DoctoryApp } from "./DoctoryApp"

test("renders learn react link", () => {
  render(<DoctoryApp />)
  const linkElement = screen.getByText(/learn chakra/i)
  expect(linkElement).toBeInTheDocument()
})
