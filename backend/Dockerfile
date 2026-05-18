FROM python:3.12-bookworm

# Environment Setup
ENV DEBIAN_FRONTEND=noninteractive
ENV GOPATH=/root/go
ENV PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

# 1. Install Core System Dependencies
RUN apt-get update && apt-get install -y \
    nmap \
    golang \
    wget \
    git \
    unzip \
    curl \
    whatweb \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Stable Go Binaries (Subfinder, HTTPX, Amass)
RUN wget https://github.com/projectdiscovery/subfinder/releases/download/v2.6.6/subfinder_2.6.6_linux_amd64.zip && \
    unzip -o subfinder_2.6.6_linux_amd64.zip && mv subfinder /usr/local/bin/ && \
    wget https://github.com/projectdiscovery/httpx/releases/download/v1.6.0/httpx_1.6.0_linux_amd64.zip && \
    unzip -o httpx_1.6.0_linux_amd64.zip && mv httpx /usr/local/bin/ && \
    wget https://github.com/OWASP/Amass/releases/download/v4.2.0/amass_linux_amd64.zip && \
    unzip -o amass_linux_amd64.zip && \
    mv amass_linux_amd64/amass /usr/local/bin/ && \
    rm -rf *.zip *.md LICENSE amass_linux_amd64 2>/dev/null || true

# 3. Install Smaller Go Tools via go install
RUN go install -v github.com/tomnomnom/assetfinder@latest && \
    go install -v github.com/tomnomnom/httprobe@latest && \
    go install -v github.com/tomnomnom/waybackurls@latest && \
    go install -v github.com/lc/gau/v2/cmd/gau@latest

# 4. Install Python Tools & Fixes (CloudEnum & Dirsearch Fixed Paths)
RUN pip install --no-cache-dir --break-system-packages "setuptools<70.0.0" defusedxml

# 🔥 FIXED CLOUDENUM: Dono potential paths (/opt/cloudenum aur /opt/cloud_enum) aur executable permissions ka rola khatam
RUN git clone https://github.com/initstring/cloud_enum.git /opt/cloudenum && \
    pip install --no-cache-dir --break-system-packages -r /opt/cloudenum/requirements.txt && \
    chmod +x /opt/cloudenum/cloud_enum.py && \
    ln -sf /opt/cloudenum/cloud_enum.py /usr/local/bin/cloud_enum && \
    ln -sf /opt/cloudenum/cloud_enum.py /usr/local/bin/cloudenum

# Setup Dirsearch (Git version + proper setup)
RUN git clone https://github.com/maurosoria/dirsearch.git /opt/dirsearch && \
    chmod +x /opt/dirsearch/dirsearch.py && \
    ln -sf /opt/dirsearch/dirsearch.py /usr/local/bin/dirsearch

# 5. Final App Setup
WORKDIR /app

# Ensure requirements exist or create a dummy one if not present
COPY requirements.txt .
RUN pip install --no-cache-dir --break-system-packages -r requirements.txt

COPY . .

# Data directory for scan results
RUN mkdir -p /app/data

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]