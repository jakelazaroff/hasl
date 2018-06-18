export declare class Color {
    private h;
    private s;
    private l;
    private a;
    constructor(h: number, s: number, l: number, a?: number);
    readonly rgba: string;
    readonly hex: string;
    alpha(alpha: number): Color;
    lighten(amount: number): Color;
    darken(amount: number): Color;
    saturate(amount: number): Color;
    desaturate(amount: number): Color;
}
export default function color(color: string): Color;
