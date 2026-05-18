# tools/__init__.py

from tools.subfinder import SubfinderTool
from tools.amass import AmassTool
from tools.assetfinder import AssetfinderTool
from tools.httpx import HttpxTool
from tools.httprobe import HttprobeTool
from tools.whatweb import WhatwebTool
from tools.waybackurls import WaybackurlsTool
from tools.gau import GauTool
from tools.cloudenum import CloudenumTool
from tools.nmap import NmapTool
from tools.dirsearch import DirsearchTool

TOOLS_MAP = {
    "subfinder": SubfinderTool,
    "amass": AmassTool,
    "assetfinder": AssetfinderTool,
    "httpx": HttpxTool,
    "httprobe": HttprobeTool,
    "whatweb": WhatwebTool,
    "waybackurls": WaybackurlsTool,
    "gau": GauTool,
    "cloudenum": CloudenumTool,
    "nmap": NmapTool,
    "dirsearch": DirsearchTool
}