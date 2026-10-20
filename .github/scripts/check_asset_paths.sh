#!/usr/bin/env bash
# Checks what lychee can't see: css url(...) and music player paths (tracks.json).
# Run from the repo root. Needs grep + jq (both on the ubuntu runner).
set -u

missing=0

check() {
  # $1 = root-relative path like /_src/img/x.png, $2 = where it came from
  if [ ! -f ".$1" ]; then
    echo "missing: $1 (from $2)"
    missing=1
  fi
}

# compiled css (that's what ships)
for css in _src/style/css/*.css; do
  while IFS= read -r p; do
    case "$p" in
      /*) check "$p" "$css" ;;
    esac
  done < <(grep -o 'url([^)]*)' "$css" | sed -E "s/^url\(['\"]?//; s/['\"]?\)$//" | sort -u)
done

# music player tracks
while IFS= read -r p; do
  check "$p" "_src/audio/tracks.json"
done < <(jq -r '.[] | .src, .img' _src/audio/tracks.json)

if [ "$missing" -ne 0 ]; then
  echo "some asset paths point at nothing"
  exit 1
fi
echo "all css url() and tracks.json paths exist"
