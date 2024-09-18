import { Worker, workerData } from 'worker_threads';

export class CustomWorker extends Worker {
  constructor(filePath: string, workerData?: any) {
    super(filePath, workerData);
    // **Enhancements:**

    // 1. Error handling for worker creation:
    this.on('error', (error) => {
      console.error('Error creating or running worker:', error);
      // Optionally handle the error more gracefully
      // (e.g., restart the worker, log the error and exit)
    });

    // 2. Custom message handling (optional):
    this.on('message', (message) => {
      console.log('Worker message received:', message);
      // Implement custom logic to handle messages from the worker
      // This could involve processing the results, sending further instructions,
      // or updating the main thread's state based on the message content.
    });

    // 3. Custom termination logic (optional):
    this.on('exit', (code) => {
      if (code !== 0) {
        console.error('Worker exited with non-zero code:', code);
      } else {
        console.log('Worker exited successfully.');
      }
      // Optionally perform cleanup or termination actions here
    });
  }
}
