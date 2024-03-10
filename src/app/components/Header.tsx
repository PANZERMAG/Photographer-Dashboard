import MenuButton from "./MenuButton"

interface Props {
    colorText: string
}

export default function Header({ colorText }: Props) {
    return (
        <header className="header" style={{ color: colorText }}>
            <div className="header__item logo_text">
                <p className="geog_18">bielik</p>
                <p className="geog_18">anastaysha</p>
            </div>
            <div className="header__item middle_text">
                <p className="poppins_18">Photographer</p>
                <p className="geog_18">Based in Wroclaw</p>
            </div>
            <div className="header__item">
                <MenuButton color={colorText} textContent="Menu" />
            </div>
        </header>
    )

}