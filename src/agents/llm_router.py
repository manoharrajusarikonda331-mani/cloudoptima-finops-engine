import json
import os

def optimize_llm_costs(file_path="data/mock_telemetry.json"):
    if not os.path.exists(file_path):
        return {"error": "Data file not found"}
        
    with open(file_path, 'r') as f:
        data = json.load(f)
        
    optimized_logs = []
    total_original_cost = 0
    total_optimized_cost = 0
    
    for log in data["llm_logs"]:
        total_original_cost += log["cost"]
        
        # Routing Rule: Low complexity goes to cheap/free local model
        if log["complexity"] == "Low":
            optimized_model = "Llama-3 (Local/Free)"
            optimized_cost = 0.000  # Zero cost for local compute
        else:
            optimized_model = log["current_model"]
            optimized_cost = log["cost"]
            
        total_optimized_cost += optimized_cost
        optimized_logs.append({
            "prompt": log["prompt"],
            "original_model": log["current_model"],
            "optimized_model": optimized_model,
            "savings": round(log["cost"] - optimized_cost, 4)
        })
        
    return {
        "logs": optimized_logs,
        "total_saved": round(total_original_cost - total_optimized_cost, 4)
    }