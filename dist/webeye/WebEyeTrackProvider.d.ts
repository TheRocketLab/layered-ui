import React from 'react';
export interface WebEyeTrackingData {
    x: number;
    y: number;
    confidence?: number;
    elapsed?: number;
    timestamp: number;
}
interface WebEyeTrackContextValue {
    gazeData: WebEyeTrackingData | null;
    isTracking: boolean;
    isStarting: boolean;
    isReady: boolean;
    error: string | null;
    start: () => Promise<void>;
    stop: () => void;
}
export declare const useWebEyeTrack: () => WebEyeTrackContextValue;
interface WebEyeTrackProviderProps {
    children: React.ReactNode;
    camConstraints?: MediaStreamConstraints;
    autoStart?: boolean;
    showVideo?: boolean;
    showFaceOverlay?: boolean;
    showFaceFeedbackBox?: boolean;
    showPredictionPoints?: boolean;
}
export declare const WebEyeTrackProvider: React.FC<WebEyeTrackProviderProps>;
export {};
//# sourceMappingURL=WebEyeTrackProvider.d.ts.map