import { useLocation } from "react-router-dom";

export default function ServerError() {
    const { state } = useLocation();

    return (
        <div>
            {state?.error ? (
                <>
                    <h3>
                        {state.error.title}
                    </h3>
                    <h2>{state.error.detail || 'Internal server error'}</h2>
                </>
            ) : (
                <h5>Server error</h5>
            )}
        </div>
    )
}