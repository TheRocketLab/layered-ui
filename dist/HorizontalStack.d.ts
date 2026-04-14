import './HorizontalStack.css';
import { type CSSProperties, type ReactNode } from 'react';
export type HorizontalStackRef = {
    goToPrev: () => void;
    goToNext: () => void;
    goToIndex: (index: number) => void;
    getActiveIndex: () => number;
};
export interface HorizontalStackProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    gap?: number;
}
export interface SlideProps {
    children: ReactNode;
}
export declare function Slide({ children }: SlideProps): import("react/jsx-runtime").JSX.Element;
export declare const HorizontalStack: import("react").ForwardRefExoticComponent<HorizontalStackProps & import("react").RefAttributes<HorizontalStackRef>>;
//# sourceMappingURL=HorizontalStack.d.ts.map