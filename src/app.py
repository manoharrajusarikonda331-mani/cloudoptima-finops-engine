import streamlit as st
import pandas as pd
import plotly.express as px
from agents.infra_agent import scan_infrastructure
from agents.llm_router import optimize_llm_costs

st.set_page_config(page_title="CloudOptima Dashboard", layout="wide")

st.title("☁️ CloudOptima: Agentic FinOps Engine")
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