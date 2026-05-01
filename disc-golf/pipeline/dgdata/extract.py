from __future__ import annotations

import hashlib
import json
from dataclasses import asdict, dataclass
from datetime import UTC, datetime
from pathlib import Path
from urllib.request import Request, urlopen

from .config import RAW_ROOT, USER_AGENT, ensure_data_dirs


@dataclass(frozen=True)
class Snapshot:
    source_name: str
    source_url: str
    fetched_at: str
    raw_path: str
    content_hash: str


def fetch_url(url: str) -> bytes:
    request = Request(url, headers={"User-Agent": USER_AGENT})
    with urlopen(request, timeout=30) as response:
        return response.read()


def snapshot_url(source_name: str, url: str, output_dir: Path | None = None) -> Snapshot:
    ensure_data_dirs()
    fetched_at = datetime.now(UTC).isoformat()
    body = fetch_url(url)
    content_hash = hashlib.sha256(body).hexdigest()

    source_dir = (output_dir or RAW_ROOT) / source_name.lower().replace(" ", "-")
    source_dir.mkdir(parents=True, exist_ok=True)
    raw_path = source_dir / f"{content_hash}.html"
    raw_path.write_bytes(body)

    snapshot = Snapshot(
        source_name=source_name,
        source_url=url,
        fetched_at=fetched_at,
        raw_path=str(raw_path.relative_to(RAW_ROOT.parent)),
        content_hash=content_hash,
    )

    manifest_path = source_dir / "manifest.jsonl"
    with manifest_path.open("a", encoding="utf-8") as manifest:
        manifest.write(json.dumps(asdict(snapshot), sort_keys=True) + "\n")

    return snapshot

