# 🛰️ AetherRecon — Automated Reconnaissance Framework

> A modern reconnaissance automation platform for security researchers, penetration testers, and bug bounty hunters.

![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![Next.js](https://img.shields.io/badge/Next.js-Frontend-black)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![License](https://img.shields.io/badge/License-Educational-orange)

---

## 🚀 Overview

AetherRecon is an automated reconnaissance framework designed to streamline the information gathering phase of security assessments.

The platform integrates multiple reconnaissance tools into a centralized workflow, enabling users to perform subdomain discovery, live host detection, and asset enumeration through an intuitive web dashboard.

---

## ✨ Features

### 🔍 Automated Recon Pipeline

Perform end-to-end reconnaissance from a single interface.

### 🌐 Subdomain Enumeration

Discover and aggregate subdomains using integrated reconnaissance tools.

### ⚡ Live Host Detection

Identify active assets and reachable targets automatically.

### 📊 Interactive Dashboard

Monitor scans and review results through a modern web interface.

### 🐳 Docker Deployment

Quick deployment using Docker and Docker Compose.

### 🔧 Modular Architecture

Easily extend the framework with additional reconnaissance modules.

---

## 🏗️ System Architecture

```text
Target Domain
      │
      ▼
Subdomain Enumeration
      │
      ▼
Result Processing
      │
      ▼
Live Host Detection
      │
      ▼
Data Storage
      │
      ▼
Dashboard & API
```

---

## 🛠 Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Radix UI

### Backend

* FastAPI
* Python

### Infrastructure

* Docker
* Docker Compose

---

## 📂 Project Structure

```bash
AetherRecon/
│
├── Frontend/              # Next.js Frontend
├── backend/               # FastAPI Backend
├── data/                  # Scan Results
├── infra/                 # Infrastructure Configurations
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/prof-teeb/AetherRecon.git
cd AetherRecon
```

### Run with Docker

```bash
docker-compose up --build
```

---

## 🔧 Backend Setup

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## 🎨 Frontend Setup

```bash
cd Frontend

npm install

npm run dev
```

---

## 📡 API Usage

### Full Recon Scan

```http
GET /api/scan?target=example.com
```

### Run Specific Tool

```http
GET /api/scan/{tool_id}?target=example.com
```

---

## 🔄 Recon Workflow

1. User submits target domain.
2. Framework launches reconnaissance modules.
3. Results are collected and normalized.
4. Live assets are identified.
5. Findings are displayed in the dashboard.
6. Results become accessible through API endpoints.

---

## 📈 Future Roadmap

* DNS Enumeration
* Port Scanning
* Screenshot Collection
* Vulnerability Detection
* Historical Tracking
* Exportable Reports
* Team Collaboration Features

---

## ⚠️ Disclaimer

This project is intended solely for authorized security testing, research, and educational purposes.

Users are responsible for complying with all applicable laws and regulations when using this software.

---

## 👨‍💻 Project Members

### Saba Ramzan
### Bilal Naeem
### Shahjahan
### Muhammad Muteeb
---

## ⭐ Support

If you find this project useful:

⭐ Star the Repository

🍴 Fork the Project

🛡️ Contribute to Development

---

## 📜 License

This project is released for educational and research purposes.

---

<div align="center">

AetherRecon © 2026

</div>
