import { BrowserWindow } from 'electron';

export interface WindowContainer {
    [key: string]: BrowserWindow | null
}
