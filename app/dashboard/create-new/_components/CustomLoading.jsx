'use client';
import React from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    // AlertDialogDescription
} from "../../../../@/components/ui/alert-dialog";
import Image from "next/image";

function CustomLoading({ loading }) {
    return (
        <AlertDialog open={loading}>
            <AlertDialogContent>
                <AlertDialogTitle className='flex flex-col items-center my-10 justify-center'>
                    <Image src={'/Loading.gif'} alt="Loading animation" width={80} height={80} />
                    <span className="text-xl">Generating your video... Do not Referesh</span>
                </AlertDialogTitle>
                {/* <AlertDialogDescription>
                    Please wait while we process your request...
                </AlertDialogDescription> */}
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default CustomLoading;
