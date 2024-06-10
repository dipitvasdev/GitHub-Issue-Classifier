"use client";
import React, { useState } from 'react';
import Loader from './loader';
import { MdTitle } from "react-icons/md";
import { FaAudioDescription, FaBug, FaQuestion } from "react-icons/fa";
import { FcHighPriority, FcIdea, FcLowPriority, FcMediumPriority } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import { FaRepeat } from "react-icons/fa6";
import toast from 'react-hot-toast';
function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Form() {
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueBody, setIssueBody] = useState('');
  const [loading, setLoading] = useState(false);
  const isDatabricksAvailable = process.env.NEXT_PUBLIC_DATABRICKS_AVAILABLE;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const inputData = {
      issue_title: issueTitle,
      issue_body: issueBody
    };
    try {
      setLoading(true);
      let response; 
      if(isDatabricksAvailable != "1"){
          response = await fetch('/api/run-py-model', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
        });
      }else{
        response = await fetch('/api/trigger-job', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputData),
        });
      }

      // Log the response text to debug
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      
      let result = responseText ? JSON.parse(responseText) : {};
      const resultString: string = result.predicted_issue_type
      setOutput(capitalizeFirstLetter(resultString));
      toast.success("Model Prediction Success");
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setOutput(null);
    setIssueTitle('');
    setIssueBody('');
  };

  return (
    <div className='flex flex-col items-center justify-center gap-4 mt-8'>
      {output ? (
        <div className="w-full max-w-md px-8 py-4 bg-white shadow-md rounded-lg flex flex-col items-center text-black">
          <h2 className="text-2xl font-bold mb-4">Prediction Output</h2>
          <p className="text-xl mb-4 flex flex-row items-center justify-center">

            {
              output == "Bug" ? (
                <FaBug className='text-xl mr-2'/>
              ): output == "Enhancement" ? ( 
                <FcIdea className='text-xl mr-2'/>
              ) : (
                <FaQuestion className='text-xl mr-2'/>
              )
            }  
            {output} 
          </p>
          <button
            onClick={handleReset}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all flex flex-row items-center justify-center"
          >
            <FaRepeat className='mr-2'/>Try again
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="text-black w-full max-w-md px-8 py-4 bg-white shadow-md rounded-lg">
          <div className="mb-4">
            <label htmlFor="title" className="flex flex-row items-center justify-start text-sm font-medium text-gray-700"><MdTitle className='mr-2' />Title</label>
            <textarea
              className="w-full h-14 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              id="title"
              name="title"
              maxLength={5000}
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="flex flex-row items-center justify-start text-sm font-medium text-gray-700"><FaAudioDescription className='mr-2' />Body</label>
            <textarea
              id="body"
              name="body"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
              value={issueBody}
              maxLength={10000}
              onChange={(e) => setIssueBody(e.target.value)}
            />
          </div>
          
          <div>
            {
              loading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  className="flex flex-row items-center justify-center w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all"
                >
                  Submit
                  <IoSend className='ml-2'/>
                </button>
              )
            }
          </div>
        </form>
      )}
    </div>
  );
}
