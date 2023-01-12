declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

export declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

export declare type EmitType = (event: string, ...args: any[]) => void
