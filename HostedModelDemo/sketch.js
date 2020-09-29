let model, inputs, img, z;

function setup() {
  createCanvas(900, 900);
  frameRate(1);
  background(30);

  model = new rw.HostedModel({
    url: "https://stylegan-25f2b83d.hosted-models.runwayml.cloud/v1/",
    token: "vwatj8rSrZaEuwsu9Xdbig==",
  });

  z = [];
  for (let i = 0; i < 512; i++) {
    z.push(random(-100, 100));
  }
}

function draw() {
  z[0] = map(mouseX, 0, width, -100, 100);
  z[1] = map(mouseY, 0, height, -100, 100);

  const inputs = {
    z: z,
    truncation: 0.9,
  };
  model.query(inputs).then((outputs) => {
    const { image } = outputs;
    img = createImg(image);
    img.hide();
  });

  if (img) {
    image(img, 0, 0, width, height);
  }
}
