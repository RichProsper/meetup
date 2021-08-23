import { AuthContextProvider } from "./AuthContext"
import { MeetupsContextProvider } from "./MeetupsContext"

export default function AllContexts({ children }) {
    return (
        <AuthContextProvider>
            <MeetupsContextProvider>
                {children}
            </MeetupsContextProvider>
        </AuthContextProvider>
    )
}
