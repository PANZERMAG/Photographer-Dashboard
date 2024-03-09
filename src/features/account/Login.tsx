import LoginForm from "../../app/components/LoginForm";

export default function LoginPage() {
    
    return (
        <section className="login-section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="" style={{ width: '30%' }}>
                <LoginForm />
            </div>
        </section>
    )
}