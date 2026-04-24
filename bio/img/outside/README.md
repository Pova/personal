# Drop outside-work photos in here

These images feed the draggable carousel at the bottom of `bio/index.html`
(the "Outside work" section).

Expected filenames (referenced from `bio/index.html`):

- alpine-1.jpeg
- alpine-selfie.jpeg
- kittens-1.jpeg
- sadona-1.jpeg
- succulent-1.jpeg
- ski-nicholas-cage.jpeg

Slides with a missing image fall back to a coloured gradient tile with
the category label (see `.photo-carousel__figure` in `css/style.css`).

Adding / removing / reordering slides: edit the `<li class="photo-carousel__slide">`
entries inside the `.photo-carousel` block in `bio/index.html`. The dot
indicators are generated from the slides automatically.
