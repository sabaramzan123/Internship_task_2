from tools.base_tool import BaseTool

class AssetfinderTool(BaseTool):
    def run(self):
        cmd = f"assetfinder --subs-only {self.target}"
        return self.execute(cmd)