import { useFormStatus } from "react-dom";
import {ReactNode} from "react";

export default function SubmitButton({ children, formStatus }: { children: ReactNode, formStatus: boolean }) {
    return (
        <button
            type="submit"
            disabled={formStatus}
            className="border text-glow-orange py-2 px-1 bg-primary text-2xl"
        >
            {children}
        </button>
    )
}