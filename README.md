# 📄 File Upload & Data Ingestion with Business Forms in Grafana

This repository contains the main JavaScript logic used within **Grafana**, utilizing the **Business Forms** plugin to:

- Upload a file through a dashboard form
- Extract and process the data
- Store the result into a configured database
- Customize user interactions (e.g., submit actions, pop-ups)

---

## ⚙️ Prerequisites

- A working instance of **Grafana**
- The **Business Forms** plugin installed and enabled
- Access to a target **database** connected to Grafana

---

## 🛠️ Setup Guide

### 1. Install Business Forms Plugin

Ensure the **Business Forms** plugin is installed in Grafana:

- Go to **Configuration → Plugins**
- Search and install **Business Forms**

> 🔧 Restart Grafana if required after plugin installation.

---

### 2. Create a Dashboard

- Open Grafana
- Click **+ Create → Dashboard**
- Add a new panel and set **Visualization type** to **Business Forms**

---

### 3. Add Form Elements

On the right-side editor panel:

- Drag and drop necessary form fields like:
  - **File Upload**
  - **Submit Button**
  - Any other form inputs needed for your use case

---

### 4. Configure the Request Section

- Scroll to the **"Request"** section within the Business Forms configuration
- Set the **target database** where extracted file data should be stored

---

### 5. Add JavaScript Logic in Request Payload

- Go to the **"Request Payload"** section
- Paste the code from update_request_payload_code.js

This JavaScript code handles:
- Reading the uploaded file
- Extracting and processing its contents
- Inserting data into the selected database

---

### 6. Customize Interactions

Enhance user experience by:

- Adding a **Submit** button
- Configuring what should happen **after submission** (e.g., pop-up message, confirmation alert)
- Using additional form settings to fine-tune layout, validations, and triggers

---

## 📁 File Details

- update_request_payload_code.js: JavaScript file containing the core logic to handle:
  - File input
  - Data extraction
  - DB write operations using Grafana’s Business Forms plugin

---

## 💬 Support & Contributions

Feel free to open an [Issue](https://github.com/Upload_File_Grafana/issues) or submit a [Pull Request](https://github.com/Upload_File_Grafana/pulls) if you have improvements or encounter any problems.

---
🎥 YouTube Tutorials

Business Forms Plugin in Grafana – https://www.youtube.com/watch?v=V4Sza0uDQNs

How to Handle File Uploads in Grafana Dashboards

📖 Official Documentation

Grafana Documentation

Business Forms Plugin Docs - (https://volkovlabs.io/blog/form-panel-file-upload-20240310/)
