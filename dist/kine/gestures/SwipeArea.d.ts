import React from 'react';
interface SwipeAreaProps {
    children: React.ReactNode;
    onSwipeLeft?: () => void;
    onSwipeRight?: () => void;
    onSwipeUp?: () => void;
    onSwipeDown?: () => void;
    velocityThreshold?: number;
    verticalVelocityThreshold?: number;
    className?: string;
}
export declare const SwipeArea: React.FC<SwipeAreaProps>;
export {};
//# sourceMappingURL=SwipeArea.d.ts.map