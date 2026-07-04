# ☁️ CloudOptima: Agentic FinOps Engine
### Autonomous Cloud Infrastructure & LLM Cost Engineering

CloudOptima is an intelligent, agentic FinOps dashboard designed to help organizations discover hidden cloud waste, identify underutilized "zombie" resources, and dynamically optimize Large Language Model (LLM) prompt routing costs. 

---

## 🚀 Live Demo
**Experience the working web application here:**  
🔗 [Live Streamlit Application](https://cloudoptima-finops-engine-kjnxbvkjrf86avkfgckqxz.streamlit.app)

---

## ✨ Key Features
* **🤖 Autonomous Cloud Scan:** One-click scanning of cloud infrastructure to evaluate waste profiles.
* **📉 Infrastructure Waste Analysis:** Dynamically calculates potential monthly savings by tracking idle staging/testing environments and legacy nodes.
* **📊 Visual Cost Analytics:** Interactive telemetry tracking cost inefficiencies per zombie resource using structured bar chart analytics.
* **🧠 Intelligent Semantic LLM Routing:** Analyzes incoming prompts and automatically routes simple queries to open-source models (like Llama-3) while reserving premium architectures (like GPT-4o) for high-complexity tasks, saving immense token overhead.

---

## 🛠️ Tech Stack
* **Frontend/Dashboard:** Streamlit (Python-driven interface)
* **Data Engineering & Telemetry:** Pandas
* **Data Visualization:** Plotly
* **Environment Control:** Python-Dotenv

---

## 📂 Project Architecture
```text
cloudoptima-finops-engine/
│
├── data/                 # Infrastructure and telemetry datasets
├── src/                  # Application source logic (app.py)
├── .gitignore            # Git configuration patterns
├── README.md             # Project documentation and submission hub
└── requirements.txt      # Production runtime dependency manifests
```

---

## ⚙️ Local Installation & Setup

### 1. Clone the repository:

```bash
git clone https://github.com/manoharrajusarikonda331-mani/cloudoptima-finops-engine.git
cd cloudoptima-finops-engine
```

### 2. Install local dependencies:

```bash
pip install -r requirements.txt
```

### 3. Launch the engine:

```bash
streamlit run src/app.py
```

---
