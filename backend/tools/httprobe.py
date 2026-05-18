from tools.base_tool import BaseTool

class HttprobeTool(BaseTool):
    def run(self):
        # Raw check for single target or piped data
        cmd = f"echo {self.target} | httprobe"
        return self.execute(cmd)