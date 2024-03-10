interface Props {
    color: string
    textContent: string
}

export default function MenuButton({ color, textContent }: Props) {
    return (
        <div className="menu_button" style={{ borderColor: color }}>
            <p className="menu_button__text">{textContent}</p>
            <div className="menu_button__circle_wrapper">
                <div className="circle" style={{ backgroundColor: color }} />
            </div>
        </div>
    )
}