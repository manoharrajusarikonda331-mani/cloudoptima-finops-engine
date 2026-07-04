import streamlit as st
import pandas as pd
import plotly.express as px
from agents.infra_agent import scan_infrastructure
from agents.llm_router import optimize_llm_costs

st.set_page_config(page_title="CloudOptima Dashboard", layout="wide")

# 🧠 Track which page view to show using Streamlit's session state memory
if "app_mode" not in st.session_state:
    st.session_state.app_mode = "landing"

# ==========================================
# 🎨 VIEW 1: THE BRAND NEW LANDING PAGE
# ==========================================
if st.session_state.app_mode == "landing":
    st.title("☁️ CloudOptima")
    st.subheader("Autonomous Cloud Infrastructure & LLM Cost Engineering")
    st.markdown("---")
    
    # Showcase your core features in neat, scannable columns for the judges
    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown("### 🤖 Autonomous Scan")
        st.write("One-click evaluation of active environment waste profiles using automated cloud agents.")
    with col2:
        st.markdown("### 📉 Infrastructure FinOps")
        st.write("Instantly tracks zombie testing environments and legacy server nodes to cut structural costs.")
    with col3:
        st.markdown("### 🧠 Semantic Routing")
        st.write("Dynamically routes token requests between cheap local models and premium enterprise LLMs.")
        
    st.markdown("---")
    
    # The big launch button that flips the layout state instantly
    if st.button("🚀 Launch CloudOptima Engine Dashboard", use_container_width=True, type="primary"):
        st.session_state.app_mode = "dashboard"
        st.rerun()
        
# ==========================================
# 📊 VIEW 2: THE CORE ENGINE DASHBOARD (Your Exact Original Code)
# ==========================================
elif st.session_state.app_mode == "dashboard":
    
    # Simple sidebar navigation to allow the judges to jump back to the home overview
    if st.sidebar.button("⬅️ Back to Home Page"):
        st.session_state.app_mode = "landing"
        st.rerun()
        
    st.title("☁️ CloudOptima: Agentic FinOps Engine!")
    st.subheader("Autonomous Cloud Infrastructure & LLM Cost Engineering")
    st.markdown("---")

    st.sidebar.header("Agent Controls")
    run_agent = st.sidebar.button("🤖 Run CloudOptima Agent Scan", type="primary")

    if not run_agent:
        st.info("Click the button in the sidebar to activate the autonomous optimization loops.")
        
        col1, col2 = st.columns(2)
        with col1:
            st.metric(label="Infrastructure Waste Status", value="Unoptimized", delta="- 2 Zombie Servers")
        with col2:
            st.metric(label="LLM Inefficiencies", value="High Token Cost", delta="- 100% Premium Routing")
    else:
        infra_results = scan_infrastructure("data/mock_telemetry.json")
        llm_results = optimize_llm_costs("data/mock_telemetry.json")
        
        st.balloons()
        st.success("🚀 Optimization Complete! CloudOptima successfully reduced infrastructure and token overhead.")
        
        m1, m2 = st.columns(2)
        with m1:
            st.metric(label="Potential Monthly Infra Savings", value=f"${infra_results['potential_monthly_savings']}", delta="Saved")
        with m2:
            st.metric(label="Instant LLM Batch Savings", value=f"${llm_results['total_saved']}", delta="Saved")
            
        st.markdown("### 🖥️ Optimized Server Architecture Actions")
        df_infra = pd.DataFrame(infra_results["wasted_resources"])
        st.dataframe(df_infra[["name", "instance_id", "cpu_utilization", "hourly_cost"]])
        
        fig = px.bar(df_infra, x="name", y="hourly_cost", title="Hourly Waste Cost Per Zombie Resource ($)", color="name")
        st.plotly_chart(fig, use_container_width=True)

        st.markdown("### 🤖 Intelligent Semantic LLM Prompt Routing Logs")
        df_llm = pd.DataFrame(llm_results["logs"])
        st.table(df_llm)