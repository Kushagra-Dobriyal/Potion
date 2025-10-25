import {Loader} from "lucide-react"

import {cva, type VariantProps}from "class-variance-authority";

import {cn} from "@/lib/utils"
{/*cn(...) ensures that:If you pass extra classes (later), they merge correctly. mans when our css is conditional then it will be used mostly */}

const spinnerVariants=cva(
    "text-muted-foreground animate-spin",{
        variants:{
            size:{
                default:"h-4 w-4",
                sm:"h-2 w-2",
                lg:"h-6 w-6",
                icon:"h-10 w-10",
            }
        },
        defaultVariants:{
            size:"default"
        }

    }
)

interface SpinnerProps extends VariantProps<typeof spinnerVariants>{}

export const Spinner=({size}:SpinnerProps)=>{
    return (
        <Loader  className={cn(spinnerVariants({size}))}/>
    )
}