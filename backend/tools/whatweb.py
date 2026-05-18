from tools.base_tool import BaseTool

class WhatwebTool(BaseTool):
    def run(self):
        # Fingerprinting with stealth level 1
        cmd = f"whatweb --aggression 1 {self.target}"
        return self.execute(cmd)