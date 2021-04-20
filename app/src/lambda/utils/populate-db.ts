import { models } from "../models";

export const populateDB = async () => {
  try {
    const gpx = new models.Gpx({
      content:
        "Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vesti",
    });

    await gpx.save();
  } catch (e) {
    console.error(e);
  }
};
