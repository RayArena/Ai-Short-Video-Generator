'use client';
import { Button } from "../../../@/components/ui/button";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import Duration from "./_components/Duration";

function CreateNew() {

    const [formData, setFormData] = useState([]);
    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    return (
        <div className="md:px-20">
            <h2 className="font-bold text-4xl text-primary text-center">Create New</h2>
            <div className="mt-10 shadow-md p-10">
                {/* Select Topic */}
                <SelectTopic onUserSelect={onHandleInputChange} />

                {/* Select Style */}
                <SelectStyle onUserSelect={onHandleInputChange} />

                {/* Select Duration */}
                <Duration onUserSelect={onHandleInputChange} />

                {/* Create Button */}
                <Button className='mt-10 w-full'>Create Short Video</Button>
            </div>
        </div>
    )
}

export default CreateNew;