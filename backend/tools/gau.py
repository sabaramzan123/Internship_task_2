from tools.base_tool import BaseTool

class GauTool(BaseTool):
    def run(self):
        # Advanced URL mining limited to top 500 results to prevent pipeline lag
        # 🔥 FIXED: Added '--providers wayback,commoncrawl' for stability and limited output
        cmd = f"gau {self.target} --providers wayback,commoncrawl | head -n 500"
        return self.execute(cmd)