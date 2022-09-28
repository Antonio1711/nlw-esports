interface Props {
    label: string;
    value: string;
    colorValue?: string;
}

export default function DuoInfo({ label, value, colorValue = '#FFFFFF' }: Props) {
    return (
        <div className="w-60 mt-4">
            <label className="text-[#C4C4C6]">{label}</label>
            <strong
                className="font-black block"
                style={{ color: colorValue }}
            >
                {value}
            </strong>
        </div>
    )
}
