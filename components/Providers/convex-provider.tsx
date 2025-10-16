"use client"

import {ReactNode} from "react"
import {ConvexProviderWithClerk} from "convex/react-clerk"
import {ConvexReactClient} from "convex/react"
import {ClerkProvider, useAuth} from "@clerk/clerk-react"
{/*  Use to connect our frontend with convex backend using url*/}
const convex=new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider=({children}:{children:ReactNode})=>{
    return(
        //ClerkProvider sets up authentication using your Clerk key.
            <ClerkProvider
                publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
            >

                {/*ConvexProviderWithClerk connects Convex and Clerk together */}
              <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
                {children}
              </ConvexProviderWithClerk> 

            
            </ClerkProvider>
    )
}

