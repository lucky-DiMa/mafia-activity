import {signal} from "@preact/signals-react";
import {type RefObject} from "react";

export const roleCountsContainerRefSignal = signal<RefObject<HTMLDivElement | null> | null>(null);