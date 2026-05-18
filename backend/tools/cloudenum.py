from tools.base_tool import BaseTool

class CloudenumTool(BaseTool):
    def run(self):
        # Cloud storage bucket enumeration
        # 🔥 FIXED: Changed 'cloudenum.py' to 'cloud_enum.py' to match the actual file name in the repo
        cmd = f"python3 /opt/cloudenum/cloud_enum.py -k {self.target.split('.')[0]}"
        return self.execute(cmd)