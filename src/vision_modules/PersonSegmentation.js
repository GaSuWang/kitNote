import * as bodyPix from '@tensorflow-models/body-pix';
import * as tf from '@tensorflow/tfjs'


export default class PersonSegmentation {
    model = null;

    constructor() {
        return (async () => {
            this.model = await bodyPix.load();
            const outputStride = 16;
            const segmentationThreshold = 0.5;

            return this;
        })();
    }

    async predict(img) {
        const personSegmentation = await net.estimatePersonSegmentation(imageElement, outputStride, segmentationThreshold);

        return personSegmentation;
    }
}