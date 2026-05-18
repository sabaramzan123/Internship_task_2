from tools.base_tool import BaseTool

class SubfinderTool(BaseTool):
    def run(self):
        # -silent hatha kar normal check karte hain taake logs terminal par dikhein
        cmd = f"subfinder -d {self.target}"
        return self.execute(cmd)