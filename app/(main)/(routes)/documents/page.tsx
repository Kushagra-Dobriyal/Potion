"use client"

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// for using the username that the user has used...

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";



const DocumentsPage = () => {
    const {user}=useUser();
    const create=useMutation(api.documnets.create);

    const onCreate=()=>{
        const promise=create({title:"Untitled"});

        toast.promise(promise,{
            loading:"Creating a new note....",
            success:"New note created",
            error:"Failed to create a new note"
        })
    }

        return (
        <>
            <div className=" h-full flex flex-col items-center justify-center space-y-4">
                <Image
                    alt="Empty"
                    src="/Empty.png"
                    height="300"
                    width="300"
                    className="dark:hidden"
                />
                <Image
                    alt="Empty"
                    src="/EmptyDark.png"
                    height="300"
                    width="300"
                    className="hidden dark:block"
                />
                <h2 className="text-lg font-medium">
                    Welcome to {user?.firstName}&apos;s Potion
                    {/* &apos is the way to wite (')  */}
                </h2>
                <Button onClick={onCreate}
                 className="bg-black text-white hover:bg-neutral-900 h-10 w-34 flex justify-center items-center space-x-0.5">
                    <PlusCircle className="size-4 mr-2 mb-0.5"/>
                    <h3 className="mb-1">Create a note</h3>
                </Button>
            </div>
            
        </>
    );
}

export default DocumentsPage;