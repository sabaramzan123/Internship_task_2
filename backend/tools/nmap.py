from tools.base_tool import BaseTool

class NmapTool(BaseTool):
    def run(self):
        cmd = f"nmap -v -F {self.target}" # Fast scan for testing
        return self.execute(cmd)