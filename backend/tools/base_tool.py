import subprocess
import re

class BaseTool:
    def __init__(self, target):
        self.target = target

    def strip_ansi(self, text):
        ansi_escape = re.compile(r'\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])')
        return ansi_escape.sub('', text)

    def execute(self, cmd):
        print(f"[*] Executing Arsenal Core: {cmd}")
        try:
            result = subprocess.run(
                cmd, 
                shell=True, 
                capture_output=True, 
                text=True,
                errors="ignore"
            )
            
            output_text = result.stdout if result.stdout.strip() else result.stderr
            lines = []
            
            for line in output_text.split('\n'):
                clean_line = self.strip_ansi(line).strip()
                
                # Filter out banners, info logs, and decorative lines
                if (not clean_line or 
                    "__" in clean_line or 
                    "projectdiscovery" in clean_line or 
                    clean_line.startswith("[INF]") or 
                    clean_line.startswith("[WARN]") or
                    clean_line.startswith("Usage:") or
                    clean_line.startswith("dirsearch:")):
                    continue
                    
                lines.append(clean_line)
                
            return lines
        except Exception as e:
            print(f"[-] Subprocess Exception: {e}")
            return [f"Error running command: {str(e)}"]