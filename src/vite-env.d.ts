/// <reference types="vite/client" />

/** Injected by ViteJS define plugin */
declare const APP_VERSION: string;
declare const APP_NAME: string;
declare const APP_MODE: string;

interface Window {
    __PIXI_APP__: Application;
    showDirectoryPicker: (params: { mode: 'reed' | 'write' | 'readwrite' }) => Promise<FileSystemDirectoryHandle>;
}
