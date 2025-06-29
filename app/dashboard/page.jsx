'use client';
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import React, { useState } from "react";
import EmptyState from "./_components/EmptyState";
import Link from "next/link";

function Dashboard() {
    const [videoList, setVideoList] = useState([]);
    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-primary">Dashboard</h2>
                <Link href={'/dashboard/create-new'}>
                    <Button><Plus /> Create New</Button>
                </Link>
            </div>

            {/* Empty State */}
            {videoList?.length == 0 && <div>
                <EmptyState />
            </div>}

        </div>
    )
}

export default Dashboard