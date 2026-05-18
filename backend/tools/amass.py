from tools.base_tool import BaseTool

class AmassTool(BaseTool):
    def run(self):
        # Amass passive enumeration command
        cmd = f"amass enum -passive -d {self.target} -silent"
        return self.execute(cmd)