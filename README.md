# 🚀 GitHub Issue Classifier

## Overview

This project is a GitHub Issue Classifier that leverages machine learning to categorize GitHub issues into different types such as bug, enhancement, and question. The model is trained using the dataset `github-labels-top3-803k-train.tar.gz` and `test.tar.gz`. Initially, the model was trained on Databricks (GCP Compute) using PySpark and scikit-learn. Due to limited resources on Databricks, the deployment was transitioned to PythonAnywhere, maintaining consistent functionality. The classifier achieves 85% accuracy using Logistic Regression.

## ✨ Features

- **Training on Databricks with PySpark**: Utilizes PySpark for scalable model training on Databricks.
- **Logistic Regression**: Achieves 85% accuracy in classifying GitHub issues.
- **PythonAnywhere Deployment**: Deployed on PythonAnywhere for consistent and reliable model inference.
- **Flask Integration**: The model inference is served through a Flask API.
- **React Frontend**: A React-based frontend to interact with the model and visualize predictions.

## 📂 Project Structure

- `Header.js`: Displays the header of the application with the model training information.
- `Form.js`: Contains the form to input issue details and get predictions.
- `Loader.js`: Displays a loading animation while waiting for model predictions.
- `Notice.js`: Displays a banner notification regarding the deployment shift.
- `api/run-py-model.js`: Handles API requests to the Flask backend running the scikit-learn model.
- `api/trigger-job.js`: Manages API requests to Databricks to trigger job runs and fetch results.

## 🖥️ Usage

### Try It Out

Check out the live version of the GitHub Issue Classifier [here](http://your-deployment-link.com).

## 📋 API Endpoints

### `/api/run-py-model`

- **Method**: POST
- **Description**: Runs the model inference using the Flask backend.
- **Request Body**:
  ```json
  {
    "issue_title": "Issue title",
    "issue_body": "Issue body"
  }
- **Response**:
 ```json
  {
    "predicted_issue_type": "Bug"
  }
```
### `/api/trigger-job`

- **Method**: POST
- **Description**: Triggers a Databricks job to run the model training notebook.
- **Request Body**:
  ```json
  {
    "issue_title": "Issue title",
    "issue_body": "Issue body"
  }
- **Response**:
 ```json
  {
    "predicted_issue_type": "Bug"
  }

```
## 👤 About Me

I am Dipit Vasdev, a highly motivated problem solver with a passion for neural networks and machine learning. I recently completed my Master's degree in Computer Engineering at New York University, and my greatest strength lies in my drive for solving complex problems in computer science. I possess a wealth of technical skills in machine learning, deep learning, Android development, and more, and I have taken part in various projects and internships to continuously improve my skills and knowledge.

## 🔗 Links

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dipit-vasdev/)

## 🗣️ Feedback

If you have any feedback, please reach out to me at [dipit.vasdev@nyu.edu](mailto:dipit.vasdev@nyu.edu).
