import './LayeredScene.css';
import { type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
export type ModalPlacement = {
    top?: number | string;
    left?: number | string;
    width?: number | string;
    height?: number | string;
};
export type LayeredSceneProps = {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    transitionMs?: number;
    easing?: string;
    depthSpacingPx?: number;
    perspectivePx?: number;
    blurAt1Px?: number;
    blurAt2Px?: number;
    opacityAt1?: number;
    opacityAt2?: number;
    minVisibleOpacity?: number;
    initialIndex?: number;
    disableNavigationButtons?: boolean;
    modalOpen?: boolean;
    onModalClose?: () => void;
    modalOrigin?: {
        x: number;
        y: number;
    };
    modalPlacement?: ModalPlacement;
};
export type LayeredSceneRef = {
    goToPrev: () => void;
    goToNext: () => void;
    goToFirst: () => void;
    goToIndex: (index: number) => void;
};
export declare const LayeredScene: import("react").ForwardRefExoticComponent<LayeredSceneProps & import("react").RefAttributes<LayeredSceneRef>>;
export interface LayerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
export declare const Layer: import("react").ForwardRefExoticComponent<LayerProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LayeredScene.d.ts.map