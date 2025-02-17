export enum LinkType {
    GitHub,
    PlayIt,
}

export interface LinkSlice {
    type: LinkType;
    link: string;
}