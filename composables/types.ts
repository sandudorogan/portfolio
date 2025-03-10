export type DataOrientation = "vertical" | "horizontal";
export type Direction = "top" | "middle" | "bottom";

export const MOUSE_X_INJECTION_KEY = Symbol() as InjectionKey<Ref<number>>;
export const MOUSE_Y_INJECTION_KEY = Symbol() as InjectionKey<Ref<number>>;

export const MAGNIFICATION_INJECTION_KEY = Symbol() as InjectionKey<ComputedRef<number>>;

export const DISTANCE_INJECTION_KEY = Symbol() as InjectionKey<ComputedRef<number>>;

export const ORIENTATION_INJECTION_KEY = Symbol() as InjectionKey<DataOrientation>;