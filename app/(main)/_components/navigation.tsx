"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ComponentRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export const Navigation = () => {

    const pathname = usePathname();// to auto matically close the side bar when the user click on a path/icon..  formobile
    const isMobile = useMediaQuery("(max-width: 768px)")// the isMobile const will have a true vlaue fi the size of the viewport is less then 768px and vica-versa...


    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ComponentRef<"aside">>(null);
    const navbarRef = useRef<ComponentRef<"div">>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);
    console.log("IsMobile : ",isMobile)
    console.log("Iscollapsed : ",isCollapsed)

    useEffect(()=>{
        setIsCollapsed(isMobile)
    },[isMobile])


    useEffect(()=>{
        if(isMobile){
            collapse();
        }else{
            resetWidth();
        }

    },[isMobile])

    // for pathname change
    useEffect(()=>{
        if(isMobile){
            collapse();
        }

    },[isMobile,pathname])

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);// call the handleMouseMove fucntion if the mouse is first pressd down and then moved
        document.addEventListener("mouseup", handleMouseUp)// when the click is relead follow the handleMouseUp fucntion
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = event.clientX;

        if (newWidth < 210){
            newWidth = 210; // lower limit
        } 
        if (newWidth > 280) newWidth = 280; // upper limit

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
        }
    };

    // the addjustments are made and the leftclick is lifited...
    const handleMouseUp = () => {
        // thsi resizing ref is telling wether the side bar is getting resized or not  right now
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth=()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(false);
            setIsResetting(true);// for animatin purposes

            sidebarRef.current.style.width=isMobile?"100%":"240px";

            navbarRef.current.style.setProperty(
                "width",
                isMobile?"0":"calc(100%-240px)"
            ); 
            navbarRef.current.style.setProperty(
                "left",
                isMobile?"100%":"240px"
            );
            setTimeout(()=>{setIsResetting(false),300});
        }
    }

    const collapse=()=>{
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width="0";
            navbarRef.current.style.setProperty("width","100%");// take full side
            navbarRef.current.style.setProperty("left","0");// leave no sapce in let side
            setTimeout(()=>setIsResetting(false),300); //  for animation
        }
    }




    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group relative flex h-full w-60 flex-col bg-secondary overflow-y-auto z-[99999]",
                    isResetting && "transition-all ease-in-out duration-300",
                    isMobile && "w-0"
                )}
            >

                <div
                    onClick={collapse}
                    role="button"
                    className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300  dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition",
                    isMobile && "opacity-100"  // as in mobile we want the collapse button to be visible all time without the need to hover
                    )}>
                    <ChevronLeft className="h-6 w-6" />

                </div>
                <div>
                    <p>Action Items</p>
                </div>
                <div className="mt-4">
                    <p>Documents</p>
                </div>
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="opacity-0 group-hover:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                    // thsi means upon hovering on the sidebar opacity will change
                />
            </aside>

            <div
                // this will take care fo the navbar to adust it self with respect to the side bar length as we drag and adjust it
                ref={navbarRef}
                className={cn("absolute top-0 z-[99999] left-60  w-[calc(100%-240px)]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "left-0 w-full"
                )}>
                
                {/* show this if either the viewport is of mobile sized or the side bar is collapsed  */}
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon onClick={resetWidth} role="button" className="h-6 w-6 text-muted-foreground" />}
                </nav>
            </div>
        </>
    );
};

