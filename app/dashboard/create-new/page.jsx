'use client';
import { Button } from "../../../@/components/ui/button";
import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import Duration from "./_components/Duration";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import CustomLoading from "./_components/CustomLoading";

function CreateNew() {

    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [videoScript, setVideoScript] = useState([]);

    const onHandleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }))
    }

    const onCreateClickHandler = () => {
        GetVideoScript();
    }

    //Get Video Script
    const GetVideoScript = async () => {
        setLoading(true);
        const prompt = 'Write a script to generate ' + formData.duration + ' video on topic : ' + formData.topic + ' along with AI image prompt in ' + formData.imageStyle + ' format for each scene and give me result in JSON format with imagePrompt and ContentText as field';
        const result = await axios.post('/api/get-video-script', {
            prompt: prompt
        }).then(resp => {
            console.log(resp.data.videoScript);
            setVideoScript(resp.data.videoScript);
            GenerateAudioFIle(resp.data.videoScript);
        });
        setLoading(false);
    }

    //Generate audio file
    const GenerateAudioFIle = async (videoScriptData) => {
        const id = uuidv4();
        let script = videoScriptData.map(item => item.ContentText).join(" ");

        await axios.post('/api/generate-audio', {
            text: videoScriptData,
            id: id
        }).then(resp=>{
            console.log(resp.data);
        })

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
                <Button className='mt-10 w-full' onClick={onCreateClickHandler}>Create Short Video</Button>
            </div>

            <CustomLoading loading={loading} />
        </div>
    )
}

export default CreateNew;