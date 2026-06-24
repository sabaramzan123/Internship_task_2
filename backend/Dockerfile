# --- Stage 1: System Tools Builder ---
# Heavy stage: installs Go, downloads all security tool binaries
FROM python:3.12-slim AS tools-builder

ENV DEBIAN_FRONTEND=noninteractive
ENV GOPATH=/root/go
ENV PATH=$PATH:/usr/local/go/bin:/root/go/bin

# Install build dependencies
RUN apt-get update && apt-get install -y \
    golang \
    wget \
    git \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Download & install Go-based security binaries
RUN wget https://github.com/projectdiscovery/subfinder/releases/download/v2.6.6/subfinder_2.6.6_linux_amd64.zip && \
    unzip -o subfinder_2.6.6_linux_amd64.zip && mv subfinder /usr/local/bin/ && \
    wget https://github.com/projectdiscovery/httpx/releases/download/v1.6.0/httpx_1.6.0_linux_amd64.zip && \
    unzip -o httpx_1.6.0_linux_amd64.zip && mv httpx /usr/local/bin/ && \
    wget https://github.com/OWASP/Amass/releases/download/v4.2.0/amass_linux_amd64.zip && \
    unzip -o amass_linux_amd64.zip && \
    mv amass_Linux_amd64/amass /usr/local/bin/ && \
    rm -rf *.zip *.md LICENSE amass_Linux_amd64

# Install smaller Go tools
RUN go install -v github.com/tomnomnom/assetfinder@latest && \
    go install -v github.com/tomnomnom/httprobe@latest && \
    go install -v github.com/tomnomnom/waybackurls@latest && \
    go install -v github.com/lc/gau/v2/cmd/gau@latest

# Clone Python-based tools
RUN git clone https://github.com/initstring/cloud_enum.git /opt/cloudenum && \
    git clone https://github.com/maurosoria/dirsearch.git /opt/dirsearch

# --- Stage 2: Python Dependency Builder ---
# Installs all Python packages into an isolated directory
FROM python:3.12-slim AS python-builder

WORKDIR /install

COPY requirements.txt .

RUN pip install --no-cache-dir --timeout=120 --prefix=/install/deps \
    "setuptools<70.0.0" \
    defusedxml && \
    pip install --no-cache-dir --timeout=120 --prefix=/install/deps \
    -r requirements.txt

RUN pip install --no-cache-dir --prefix=/install/deps \
    "setuptools<70.0.0" defusedxml

# --- Stage 3: Lean Production Runtime ---
# Only copies what's needed — no compilers, no build tools
FROM python:3.12-slim AS runtime

ENV DEBIAN_FRONTEND=noninteractive
ENV GOPATH=/root/go
ENV PATH=$PATH:/usr/local/go/bin:/root/go/bin:/usr/local/bin

# Runtime-only system packages (no golang, no wget, no git)
RUN apt-get update && apt-get install -y \
    nmap \
    whatweb \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy compiled Go binaries from tools-builder
COPY --from=tools-builder /usr/local/bin/subfinder /usr/local/bin/
COPY --from=tools-builder /usr/local/bin/httpx /usr/local/bin/
COPY --from=tools-builder /usr/local/bin/amass /usr/local/bin/
COPY --from=tools-builder /root/go/bin/assetfinder /usr/local/bin/
COPY --from=tools-builder /root/go/bin/httprobe /usr/local/bin/
COPY --from=tools-builder /root/go/bin/waybackurls /usr/local/bin/
COPY --from=tools-builder /root/go/bin/gau /usr/local/bin/

# Copy Python tools
COPY --from=tools-builder /opt/cloudenum /opt/cloudenum
COPY --from=tools-builder /opt/dirsearch /opt/dirsearch

# Setup symlinks for Python tools
RUN chmod +x /opt/cloudenum/cloud_enum.py /opt/dirsearch/dirsearch.py && \
    ln -sf /opt/cloudenum/cloud_enum.py /usr/local/bin/cloud_enum && \
    ln -sf /opt/cloudenum/cloud_enum.py /usr/local/bin/cloudenum && \
    ln -sf /opt/dirsearch/dirsearch.py /usr/local/bin/dirsearch

# Copy Python dependencies from python-builder
COPY --from=python-builder /install/deps /usr/local

# App setup
WORKDIR /app
COPY . .

# Secure env variable declarations (values injected at runtime, not hardcoded)
ENV API_SECRET_KEY=""
ENV DATABASE_URL=""
ENV ALLOWED_ORIGINS=""

RUN mkdir -p /app/data

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]