from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tools import TOOLS_MAP
import subprocess

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/scan")
async def master_scan(target: str):
    if not target:
        raise HTTPException(status_code=400, detail="Target required")
        
    print(f"[*] Starting Pipeline Master Monitor for: {target}")
    try:
        # Safe execution of tools even if one is missing or fails
        subfinder_out = []
        assetfinder_out = []
        
        try:
            subfinder_out = TOOLS_MAP["subfinder"](target).run()
        except Exception as e:
            print(f"[-] Subfinder failed in pipeline: {e}")
            
        try:
            if "assetfinder" in TOOLS_MAP:
                assetfinder_out = TOOLS_MAP["assetfinder"](target).run()
        except Exception as e:
            print(f"[-] Assetfinder failed in pipeline: {e}")
            
        unique_subs = list(set(subfinder_out + assetfinder_out))
        
        if unique_subs:
            subs_payload = "\n".join(unique_subs)
            temp_file_path = f"/tmp/{target}_subs.txt"
            with open(temp_file_path, "w") as f:
                f.write(subs_payload)
            
            # Run httpx probing
            live_out = TOOLS_MAP["httpx"](target).run(input_file=temp_file_path)
        else:
            live_out = [f"{target} [200] [No subdomains found]"]
            
        return {
            "domain": target,
            "total_discovered": len(unique_subs),
            "live_results": live_out
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/scan/{tool_id}")
async def scan_single_tool(tool_id: str, target: str):
    tool_lower = tool_id.lower()
    if tool_lower not in TOOLS_MAP:
        raise HTTPException(status_code=404, detail=f"Tool '{tool_id}' is not integrated yet.")
        
    try:
        tool_class = TOOLS_MAP[tool_lower]
        tool_instance = tool_class(target=target)
        output = tool_instance.run()
        return {"tool": tool_id, "target": target, "results": output}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))