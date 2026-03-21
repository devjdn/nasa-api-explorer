import { create } from "zustand";

export type ControlPanelType = "apod" | "epic" | "neows" | null;

type ControlPanelStore = {
    open: boolean;
    activeControlPanel: ControlPanelType;
    setOpen: (open: boolean) => void;
    toggleOpen: () => void;
    setActiveControlPanel: (panel: ControlPanelType) => void
}

export const useControlPanelStore = create<ControlPanelStore>((set) => ({
    open: false,
    activeControlPanel: null,
    setOpen: (open) => set({ open }),
    toggleOpen: () => set((state) => ({ open: !state.open })),
    setActiveControlPanel: (panel) => set({ activeControlPanel: panel }),
}));