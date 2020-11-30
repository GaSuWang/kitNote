import * as cocoSSD from "@tensorflow-models/coco-ssd";
import * as tf from '@tensorflow/tfjs'


export default class ObjectDetection {
  model = null;

  constructor() {
    return (async () => {
      this.model = await cocoSSD.load();

      return this;
    })();
  }

  async predict(img) {
    let predicted = [];
    let rst = await this.model.detect(img);

    for (var i = 0; i < rst.length; i++) {
      predicted.push(rst[i].class);

      if (i == 3) break;
    }
    return predicted;
  }
}