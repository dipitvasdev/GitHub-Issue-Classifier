import { NextApiRequest, NextApiResponse } from "next";
import fetch from 'node-fetch'

const DATABRICKS_INSTANCE = process.env.NEXT_PUBLIC_DATABRICKS_INSTANCE;
const DATABRICKS_TOKEN = process.env.NEXT_PUBLIC_DATABRICKS_TOKEN;
const JOB_ID = process.env.NEXT_PUBLIC_JOB_ID;

// Type to capture job status response
type JobStatusResponse = {
  state: {
    life_cycle_state: string;
  };
};

// Type to capture job outcome response
type JobOutputResponse = {
  notebook_output: {
    result: string;
  };
}
// Type to capture job trigger response
type TriggerJobResult = {
  run_id: number;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const inputData = req.body;
    try {
      console.log("Received Feature Data", inputData);
      // Trigger the Databricks job

      const triggerJobResponse = await fetch(`https://${DATABRICKS_INSTANCE}/api/2.0/jobs/run-now`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          job_id: JOB_ID,
          notebook_params: {
            input_data: JSON.stringify(inputData)
          }
        })
      });

      if (!triggerJobResponse.ok) {
        throw new Error(`Failed to trigger job: ${triggerJobResponse.statusText}`);
      }
      // Get the job trigger result to find the run Id
      const triggerJobResult: TriggerJobResult = await triggerJobResponse.json() as TriggerJobResult;
      const runId = triggerJobResult.run_id;

      // Poll for job status
      let jobStatus = 'RUNNING';
      let output;

      while (jobStatus === 'RUNNING' || jobStatus === 'PENDING') {
        // Get the job status
        const jobStatusResponse = await fetch(`https://${DATABRICKS_INSTANCE}/api/2.0/jobs/runs/get?run_id=${runId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });

        if (!jobStatusResponse.ok) {
          throw new Error(`Failed to get job status: ${jobStatusResponse.statusText}`);
        }

        const jobStatusResult: JobStatusResponse = await jobStatusResponse.json() as JobStatusResponse;
        jobStatus = jobStatusResult.state.life_cycle_state;
        // Check the current job status

        if (jobStatus === 'TERMINATED') {
          // Get the job output
          const jobOutputResponse = await fetch(`https://${DATABRICKS_INSTANCE}/api/2.0/jobs/runs/get-output?run_id=${runId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          });

          if (!jobOutputResponse.ok) {
            throw new Error(`Failed to get job output: ${jobOutputResponse.statusText}`);
          }

          const jobOutputResult: JobOutputResponse = await jobOutputResponse.json() as JobOutputResponse;
          output = jobOutputResult.notebook_output.result;
          console.log("Job Output", output);
        } else {
          await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
        }

      }

      res.status(200).json(output);

    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }

}