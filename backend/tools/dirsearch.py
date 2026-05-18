from tools.base_tool import BaseTool

class DirsearchTool(BaseTool):
    def run(self):
        # Clean parameters: -u for url, -e for extensions, -t for threads
        cmd = f"dirsearch -u {self.target} -e php,html,js -t 40 --suppress-empty"
        return self.execute(cmd)