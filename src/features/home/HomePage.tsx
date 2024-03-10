import Header from "../../app/components/Header";
import "/src/assets/styles/home-page.scss"

export default function HomePage() {
    return (
        <div className="container">
            <section className="start-section">
                <Header colorText='white' />
                <div className="background_wrapper">
                    <div className="background_relative">
                        <img src="src\assets\imgs\396523258_18394907011004480_9115116655292923776_n.png" alt="background image" className="background-img" />
                    </div>
                    <div className="background_relative">
                        <img src="src\assets\imgs\397245375_18394907038004480_8013005607567448472_n.png" alt="background image" className="background-img" />
                    </div>
                </div>
                <div className="start-section-title">
                    <p className="transparent-text">UCHWYCE</p>
                    <p className="title-text">MOMENT</p>
                </div>
            </section>
            <section className="about-me">
                
            </section>
        </div>
    )
}