import { SignedIn, SignedOut, SignInButton } from "@clerk/react-router"
import { Navigate } from "react-router"
import styles from "./ForcedLogin.module.css"
const ForcedLogin = () => {
    return (
        <>
            <SignedIn>
                <Navigate to={"/home"} />
            </SignedIn>
            <div className={styles.rootFlex}>
                <SignedOut>
                    <div className={styles.rootContainer}>
                    <h1 className={styles.openingText}>You Must Be Signed In To Use This App</h1>
                    
                    <SignInButton>
                        <button className={styles.signIn}>Sign in</button>
                    </SignInButton>
                    </div>
                    
                </SignedOut>
            </div>
        </>
    )
}

export default ForcedLogin