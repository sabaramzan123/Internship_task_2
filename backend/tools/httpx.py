from tools.base_tool import BaseTool

class HttpxTool(BaseTool):
    def run(self, input_file=None):
        # Agar master scan se koi file aa rahi hai toh wo use kare, warna direct target
        if input_file:
            cmd = f"httpx -l {input_file} -silent -sc -title -td -nc"
        else:
            cmd = f"echo {self.target} | httpx -silent -sc -title -td -nc"
        return self.execute(cmd)