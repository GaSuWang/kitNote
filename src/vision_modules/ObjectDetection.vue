<script>
import * as cocoSSD from "@tensorflow-models/coco-ssd";

export default class ObjectDetection {
  constructor() {
    return (async () => {
      this.model = cocoSSD.load();

      return this;
    })();
  }

  async predict(img) {
    let predicted = [];
    let rst = await this.model.detect(img);

    for (var i = 0; i < rst.length; i++) {
      predicted.push(rst[i].class);

      if (i == 6) break;
    }

    return predicted;
  }
}
</script>