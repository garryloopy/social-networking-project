import Login from "../components/Login";

export default function LandingPage() {
    return (
        <main>
            <div className="flex align-middle text-center">
                <div className="flex-1 mt-auto mb-auto">
                    <h1>Welcome to ConnectHub</h1>
                    <p>ConnectHub is a social networking project built with React.</p>
                    <p>Made by:</p>
                    <ul>
                        <li>Garry Jr</li>
                        <li>Edward </li>
                        <li>Kevin</li>
                    </ul>
                </div>
                <div className="flex-1 mt-auto mb-auto py-20 px-8">
                    <Login />
                </div>
            </div>

            <div className="flex align-middle text-center">
                This is a profile component
            </div>
            
        </main>
    )
}