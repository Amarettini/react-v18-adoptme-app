import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../Carousel";

test("lets users click on thumbnails to make them the hero img", async () => {
  const images = ["0.jpg", "1.jpg", "2.jpg", "3.jpg"];
  const carousel = render(<Carousel images={images} />);

  const hero = await carousel.findByTestId("hero");
  expect(hero.getAttribute("src")).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const targetThumb = await carousel.findByTestId(`thumbnail${i}`);

    await targetThumb.click();

    // hero image should be same as target thumbnail
    expect(hero.getAttribute("src")).toContain(image);
    // target thumbnail should have active class
    expect(Array.from(targetThumb.classList)).toContain("active");

    const thumbnails = await carousel.findAllByTestId(/thumbnail/);
    const nonActiveThumbs = thumbnails.filter((thumbnail) => !(thumbnail === targetThumb));

    // non-target thumbnails should not have active class
    expect(nonActiveThumbs.map((thumb) => thumb.classList.contains("active"))).toEqual([
      false,
      false,
      false,
    ]);
  }
});
