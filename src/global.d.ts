
declare module '@faceio/fiojs' {
    const faceIO: any;
    export default faceIO;
}

declare module '$env/static/public' {
    export const PUBLIC_FACEIO_PUBLIC_ID: string;
}
