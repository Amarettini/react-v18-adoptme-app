import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Pet from "../Pet";
import { StaticRouter } from "react-router-dom/server";

test("displays a default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet />
    </StaticRouter>,
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.getAttribute("src")).toContain("none.jpg");
  pet.unmount();
});

test("displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter>
      <Pet images={["1.jpg", "2.jgp", "3.jpg"]} />
    </StaticRouter>,
  );

  const petThumbnail = await pet.findByTestId("thumbnail");
  expect(petThumbnail.getAttribute("src")).toContain("1.jpg");
});
