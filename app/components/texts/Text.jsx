export default function Text({children, setBlack}) {
    return (
        <p className={`${setBlack ? "text-slate-700" : "text-white"} font-semibold text-xl`}>
            {children}
        </p>
    )
}