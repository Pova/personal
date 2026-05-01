from __future__ import annotations

import json
from pathlib import Path

from .config import PROCESSED_ROOT, STATIC_DATA_ROOT, ensure_data_dirs
from .parse import parse_seed_dataset
from .transform import build_analysis


def export_static_data(output_dir: Path = STATIC_DATA_ROOT) -> dict[str, object]:
    ensure_data_dirs()
    dataset = parse_seed_dataset()
    analysis = build_analysis(dataset)

    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / "gannon-buhr-analysis.json"
    output_path.write_text(json.dumps(analysis, indent=2), encoding="utf-8")

    processed_path = PROCESSED_ROOT / "gannon-buhr-analysis.json"
    processed_path.write_text(json.dumps(analysis, indent=2), encoding="utf-8")
    return analysis

