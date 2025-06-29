import { Button } from "../../../components/ui/button";
import React from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import Duration from "./_components/Duration";

function CreateNew() {
    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
            <div className="mt-10 shadow-md p-10">
                {/* Select Topic */}
                <SelectTopic />

                {/* Select Style */}
                <SelectStyle />

                {/* Select Duration */}
                <Duration />

                {/* Create Button */}
            </div>
        </div>
    )
}

export default CreateNew;