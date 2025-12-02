export default function PasswordStrengthIndicator ({password}:{password: string}){
    const getStrength = () => {
        if (!password) return 0
        let strength = 0
        if (password.length >= 8) strength++
        if (password.length >= 12) strength++
        if (/[a-z]/.test(password)) strength++
        if (/[A-Z]/.test(password)) strength++
        if (/\d/.test(password)) strength++
        return strength
    }

    const strength = getStrength()
    const widthPercent = (strength / 5) * 100

    const getColor = () => {
        if (strength <= 2) return "bg-red-500"
        if (strength <= 4) return "bg-yellow-500"
        return "bg-green-500"
    }

    const getLabel = () => {
        if (strength === 0) return ""
        if (strength <= 2) return "Weak"
        if (strength <= 4) return "Ok"
        return "Strong"
    }

    if (!password) return null

    return (
        <div>
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-white">Password strength</span>
                <span className="text-xs text-white">{getLabel()}</span>
            </div>
            <div className="w-full bg-white rounded-full h-2">
                <div
                    className={`h-2 rounded-full transition-all ${getColor()}`}
                    style={{ width: `${widthPercent}%` }}
                />
            </div>
        </div>
    )
}