#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
docker run --rm -v "$PWD":/doc -w /doc texlive/texlive:latest bash -c '
set -e
apt-get update -qq >/dev/null
apt-get install -y -qq --no-install-recommends fonts-roboto fonts-adobe-sourcesans3 poppler-utils >/dev/null
export TEXMFVAR=/tmp/texmf-var XDG_CACHE_HOME=/tmp/.cache
lualatex -interaction=nonstopmode -halt-on-error letter.tex >build.log 2>&1 || { tail -40 build.log; exit 1; }
lualatex -interaction=nonstopmode -halt-on-error letter.tex >>build.log 2>&1
grep -E "Overfull|Warning" build.log | head -20 || true
pdfinfo letter.pdf | grep -E "Pages|Page size"
pdftoppm -png -r 120 letter.pdf page
'
echo "===PDF==="; base64 -w0 letter.pdf; echo

echo "===END==="
