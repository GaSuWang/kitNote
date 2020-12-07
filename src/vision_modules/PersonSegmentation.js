/* eslint-disable no-unused-vars */
import * as bodyPix from '@tensorflow-models/body-pix';
import * as tf from '@tensorflow/tfjs'


export default class PersonSegmentation {
    model = null;

    constructor() {
        return (async () => {
            this.model = await bodyPix.load();
            return this;
        })();
    }

    async predict(canvasElement, backgroundElement) {
        const ctx = canvasElement.getContext("2d");
        const backCtx = backgroundElement.getContext("2d");

        const personSegmentation = await this.model.segmentPerson(canvasElement, {
            flipHorizontal: false,
            internalResolution: 'medium',
            segemtationThreshold: 0.7
        })

        const foregroundColor = { r: 255, g: 255, b: 255, a: 255 };
        const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
        const backgroundMask = bodyPix.toMask(personSegmentation, foregroundColor, backgroundColor);

        var imgData = ctx.getImageData(0, 0, 400, 400);
        var backData = backCtx.getImageData(0, 0, 400, 400);

        console.log(backgroundMask);

        for (var i = 0; i < 400 * 400; i++) {
            if (backgroundMask.data[i * 4] == 0) {
                imgData.data[i * 4] = backData.data[i * 4];
                imgData.data[i * 4 + 1] = backData.data[i * 4 + 1];
                imgData.data[i * 4 + 2] = backData.data[i * 4 + 2];
                imgData.data[i * 4 + 3] = backData.data[i * 4 + 3];
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }
}