"use client";

import { useLayoutEffect } from "react";
import { useControlPanelStore, type ControlPanelType } from "@/stores/control-panel";

export default function ControlPanelSlot({ panel }: { panel: ControlPanelType }) {
    const setActiveControlPanel = useControlPanelStore((s) => s.setActiveControlPanel);

    useLayoutEffect(() => {
        setActiveControlPanel(panel);
        return () => setActiveControlPanel(null);
    }, [panel, setActiveControlPanel]);

    return null;
}