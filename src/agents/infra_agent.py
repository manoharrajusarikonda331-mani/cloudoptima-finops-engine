import json
import os

def scan_infrastructure(file_path="data/mock_telemetry.json"):
    if not os.path.exists(file_path):
        return {"error": "Data file not found"}
        
    with open(file_path, 'r') as f:
        data = json.load(f)
        
    wasted_resources = []
    total_hourly_waste = 0
    
    for inst in data["ec2_instances"]:
        # If CPU usage is less than 5%, it's wasting money
        if inst["cpu_utilization"] < 5.0:
            wasted_resources.append(inst)
            total_hourly_waste += inst["hourly_cost"]
            
    # Monthly waste estimation = hourly waste * 24 hours * 30 days
    monthly_savings = total_hourly_waste * 24 * 30
    
    return {
        "wasted_resources": wasted_resources,
        "potential_monthly_savings": round(monthly_savings, 2)
    }