import { useSignIn } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button';

const SignInAndAuthButtons = () => {
    const {signIn,isLoaded} = useSignIn();

    if(!isLoaded){
        return null;
    }

const signInWithGoogle = async () => {
    try {
        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback"
        });
    } catch (err) {
        console.error("OAuth redirect error:", err);
    }
}

  return (
    <Button onClick={signInWithGoogle} variant={"secondary"} className="w-full 
    text-white border-zinc-200 h-11">
        Continue with Google

    </Button>
  )
}

export default SignInAndAuthButtons