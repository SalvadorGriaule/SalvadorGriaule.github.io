enum LinkType {
    GitHub,
    PlayIt,
}

enum Device {
    SmartPhone = "SmartPhone",
    Laptop = "Laptop"
}

interface LinkSlice {
    type: LinkType;
    link: string;
}

interface OngletFunc {
    fn:Function;
    titre:string;
}

export { LinkType , Device};
export type { LinkSlice, OngletFunc };
