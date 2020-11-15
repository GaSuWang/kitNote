import * as cocoSSD from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'

<script>
export default {
  methods: {
    async predict(img) {
      let predicted = [];
      let rst = await model.detect(img);

      for (var i = 0; i < rst.length; i++) {
        predicted.push(rst[i].class);

        if (i == 9) break;
      }

      return predicted;
    },
  },

  async mounted() {
    model = await cocoSSD.load();

    console.log("model loaded");
  },
};
</script>