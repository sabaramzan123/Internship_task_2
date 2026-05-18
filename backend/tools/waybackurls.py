from tools.base_tool import BaseTool

class WaybackurlsTool(BaseTool):
    def run(self):
        # Historical URL discovery limited to top 500 results for pipeline speed
        # 🔥 FIXED: Added '| head -n 500' to truncate heavy output early
        cmd = f"waybackurls {self.target} | head -n 500"
        return self.execute(cmd)