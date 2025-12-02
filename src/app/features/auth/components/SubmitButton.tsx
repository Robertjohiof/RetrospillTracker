import { useFormStatus } from "react-dom";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="border text-glow-orange py-2 px-1 bg-primary text-2xl"
        >
            {pending ? "Logging inn..." : "Login"}
        </button>
    )
}