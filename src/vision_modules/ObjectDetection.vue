import * as cocoSSD from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'

<script>
export default class ObjectDetection {
  constructor() {
    this.model = await cocoSSD.load()
  }

  async predict(img) {
    let predicted = [];
    let rst = await model.detect(img);

    for (var i = 0; i < rst.length; i++) {
      predicted.push(rst[i].class);

      if (i == 6) break;
    }

    return predicted;
  }
}
</script>