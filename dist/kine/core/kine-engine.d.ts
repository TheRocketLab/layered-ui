import type { HandLandmarkerResult } from '@mediapipe/tasks-vision';
export declare class KineEngine {
    private static instance;
    private handLandmarker;
    private videoElement;
    private isInitialized;
    private constructor();
    static getInstance(): KineEngine;
    initialize(videoElement: HTMLVideoElement): Promise<void>;
    detectHands(timeInMs: number): HandLandmarkerResult | null;
}
export declare const engine: KineEngine;
//# sourceMappingURL=kine-engine.d.ts.map