import React from 'react';
import type { NormalizedLandmark } from '@mediapipe/tasks-vision';
interface KineContextType {
    landmarksRef: React.MutableRefObject<NormalizedLandmark[][] | null>;
    isWebcamActive: boolean;
    webcamError: string | null;
}
export declare const useKine: () => KineContextType;
interface KineProviderProps {
    children: React.ReactNode;
    showDebugVideo?: boolean;
}
export declare const KineProvider: React.FC<KineProviderProps>;
export {};
//# sourceMappingURL=KineProvider.d.ts.map