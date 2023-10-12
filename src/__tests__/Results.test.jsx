import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Results from "../components/Results";

test("renders correctly with no pets", () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchSnapshot();
});
