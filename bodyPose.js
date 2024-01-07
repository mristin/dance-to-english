/**
 * Provide a simplest user interface for body pose recognition.
 */

/**
 * List the inputs and options to the body pose recognizer.
 *
 * @typedef {Object} Arguments
 * @property {HTMLDivElement} container where to insert the video and the canvas
 * @property {number} width of the video stream
 * @property {number} height of the video stream
 * @property {function} callback function on the detected body pose
 * and the timestamp
 */

import * as tasksVision
    from "https://cdn.skypack.dev/@mediapipe/tasks-vision@0.10.0";


/**
 * Create and initialize video stream and the recognition.
 *
 * @param {Arguments} args of the pose recognition
 */
export async function initializeRecognition(args) {
    args.container.innerHTML = `<div 
    style="position: relative"
><video
        style="width: ${args.width}px; height: ${args.height}px; left: 0px; top: 0px; transform: rotateY(180deg);"
        autoplay
        playsinline
></video><canvas
        width="${args.width}" height="${args.height}"
        style="position: absolute; left: 0px; top: 0px;"
></canvas></div>`

    const div = args.container.firstChild;

    // noinspection JSValidateTypes
    /**
     * @type {HTMLVideoElement}
     */
    const video = div.firstChild;

    // noinspection JSValidateTypes
    /**
     * @type {HTMLCanvasElement}
     */
    const canvasElement = video.nextSibling;

    const canvasCtx = canvasElement.getContext("2d");

    // NOTE (mristin):
    // We mirror for better user experience.
    canvasCtx.translate(canvasElement.width, 0);
    canvasCtx.scale(-1, 1);

    const drawingUtils = new tasksVision.DrawingUtils(canvasCtx);

    const hasGetUserMedia = (
        () => !!navigator.mediaDevices?.getUserMedia
    );
    if (!hasGetUserMedia()) {
        throw new Error(
            "The getUserMedia() is not supported in your browser."
        );
    }

    const vision = await tasksVision.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    const poseLandmarker = await tasksVision.PoseLandmarker
        .createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
                    delegate: "GPU"
                },
                runningMode: "VIDEO",
                numPoses: 1
            }
        );

    let lastVideoTimeMs = -1;

    const connections = [
        {start: 11, end: 12},
        {start: 11, end: 13},
        {start: 13, end: 15},
        {start: 12, end: 14},
        {start: 14, end: 16},
        {start: 12, end: 24},
        {start: 11, end: 23},
        {start: 24, end: 23},
        {start: 24, end: 26},
        {start: 26, end: 28},
        {start: 23, end: 25},
        {start: 25, end: 27}
    ];

    async function predictWebcam() {
        let startTimeMs = window.performance.now();
        if (lastVideoTimeMs !== video.currentTime) {
            lastVideoTimeMs = video.currentTime;
            poseLandmarker.detectForVideo(
                video,
                startTimeMs,
                (result) => {
                    canvasCtx.save();
                    canvasCtx.clearRect(
                        0, 0, canvasElement.width, canvasElement.height
                    );
                    for (const pose of result.landmarks) {
                        drawingUtils.drawConnectors(
                            pose,
                            connections
                        );
                    }
                    canvasCtx.restore();

                    if (result.landmarks.length > 1) {
                        throw new Error(
                            "Expected at most one body pose, but got "
                            + result.landmarks.length
                        );
                    }

                    const pose = result.landmarks[0];

                    args.callback(pose, video.currentTime);
                }
            );
        }

        window.requestAnimationFrame(predictWebcam);
    }

    navigator.mediaDevices
        .getUserMedia(
            {video: true}
        )
        .then(
            (stream) => {
                video.srcObject = stream;
                video.addEventListener("loadeddata", predictWebcam);
            }
        );
}


/**
 * Capture the hands raised in a frame.
 */
class HandsRaised {
    /**
     * @param {boolean} left set if left hand raised
     * @param {boolean} right set if right hand raised
     */
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

/**
 * Compute which hand is raised.
 *
 * @param {tasksVision.NormalizedLandmark[]} pose
 * @return {HandsRaised|null}
 */
function determineHandsRaised(
    pose
) {
    // NOTE (mristin):
    // See: https://developers.google.com/mediapipe/solutions/vision/pose_landmarker#pose_landmarker_model
    // for landmark indices.

    const leftShoulder = pose[11];
    const rightShoulder = pose[12];

    const leftElbow = pose[13];
    const rightElbow = pose[14];

    // NOTE (mristin):
    // If one of the shoulders is invisible, we can not determine
    // the angle between the elbows and the shoulders.
    if (
        leftShoulder.x < 0.0
        || leftShoulder.x > 1.0
        || leftShoulder.y < 0.0
        || leftShoulder.y > 1.0
        || rightShoulder.x < 0.0
        || rightShoulder.x > 1.0
        || rightShoulder.y < 0.0
        || rightShoulder.y > 1.0
    ) {
        return null;
    }

    // NOTE (mristin):
    // The model seems to be robust even if the elbow is not in
    // the frame, so we still compute the angle when the elbows
    // are invisible.

    // NOTE (mristin):
    // We negate the y-direction as the poses are given with
    // the y-axis pointing down.

    const leftVectorX = leftElbow.x - leftShoulder.x;
    const leftVectorY = -(leftElbow.y - leftShoulder.y);

    const leftAngleRad = Math.atan2(leftVectorY, leftVectorX);
    const leftAngleDeg = leftAngleRad * (180.0 / Math.PI);

    const rightVectorX = rightElbow.x - rightShoulder.x;
    const rightVectorY = -(rightElbow.y - rightShoulder.y);

    const rightAngleRad = Math.atan2(rightVectorY, rightVectorX);
    const rightAngleDeg = rightAngleRad * (180.0 / Math.PI);

    const leftHandRaised = leftAngleDeg > 5.0;
    const rightHandRaised = (
        rightAngleDeg > 0.0
        && rightAngleDeg < 175.0
    );

    return new HandsRaised(leftHandRaised, rightHandRaised);
}

/**
 * Capture the hand status with a timestamp.
 *
 * @typedef {Object} TimestampedHandsRaised
 * @property {HandsRaised|null} status
 * @property {number} timestamp
 */

/**
 * Model the hand events.
 *
 * @type {{LeftRaised: number, RightRaised: number, BothRaised: number}}
 */
export const HandEvent = {
    LeftRaised: 0,
    RightRaised: 1,
    BothRaised: 2
}

/**
 * Create the handler to be supplied to the body pose recognizer for handling
 * hand raising.
 *
 * @param {function} callback to be called on the HandEvent and timestamp.
 */
export function newHandRaisingHandler(callback) {
    /**
     * @type {Array<TimestampedHandsRaised>}
     */
    const statusWindow = [];

    /**
     * Enumerate possible hand state.
     * @type {{bothUp: number, leftUp: number, rightUp: number, down: number}}
     */
    const State = {
        down: 0,  // includes undecided/unknown
        leftUp: 1,
        rightUp: 2,
        bothUp: 3
    }
    let lastState = State.down;

    return function (pose, timestamp) {
        let status = null;
        if (pose !== undefined) {
            status = determineHandsRaised(pose);
        }

        while (
            statusWindow.length > 0
            && timestamp - statusWindow[0].timestamp > 1
            ) {
            statusWindow.shift();
        }
        statusWindow.push({status: status, timestamp: timestamp});

        // NOTE (mristin):
        // We simply count and judge by majority vote. We disregard
        // the timestamps, as the window is assumed to be pretty short.
        // This is a very rudimentary approach, but works well on modern
        // machines where recognition FPS is fairly decent.

        let leftUpCount = 0;
        let rightUpCount = 0;
        let bothUpCount = 0;

        for (const timestampedStatus of statusWindow) {
            if (timestampedStatus.status === null) {
                // No hand state is recognized, pass.
            } else if (
                timestampedStatus.status.left
                && !timestampedStatus.status.right
            ) {
                leftUpCount++;
            } else if (
                !timestampedStatus.status.left
                && timestampedStatus.status.right
            ) {
                rightUpCount++;
            } else if (
                timestampedStatus.status.left
                && timestampedStatus.status.right
            ) {
                bothUpCount++;
            } else if (
                !timestampedStatus.status.left
                && !timestampedStatus.status.right
            ) {
                // Both hands are down, pass.
            } else {
                throw new Error(
                    "Unexpected hand status: "
                    + "left: " + timestampedStatus.status.left
                    + ", right " + timestampedStatus.status.right
                );
            }
        }

        let newState;

        const threshold = Math.round(statusWindow.length * 0.8);
        if (leftUpCount > threshold) {
            newState = State.leftUp;
        } else if (rightUpCount > threshold) {
            newState = State.rightUp;
        } else if (bothUpCount > threshold) {
            newState = State.bothUp;
        } else {
            newState = State.down;
        }

        if (newState !== lastState) {
            switch (newState) {
                case State.leftUp:
                    callback(HandEvent.LeftRaised, timestamp);
                    break;
                case State.rightUp:
                    callback(HandEvent.RightRaised, timestamp);
                    break;
                case State.bothUp:
                    callback(HandEvent.BothRaised, timestamp);
                    break;
                case State.down:
                    // We do not exercise any action on `down`.
                    break;
                default:
                    throw new Error("Unexpected new state: " + newState);
            }
        }
        lastState = newState;
    }
}
