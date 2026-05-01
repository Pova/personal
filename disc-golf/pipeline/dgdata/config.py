from __future__ import annotations

from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
PIPELINE_ROOT = PROJECT_ROOT / "pipeline"
DATA_ROOT = PROJECT_ROOT / "data"
RAW_ROOT = DATA_ROOT / "raw"
INTERIM_ROOT = DATA_ROOT / "interim"
PROCESSED_ROOT = DATA_ROOT / "processed"
SEED_ROOT = DATA_ROOT / "seed"
STATIC_DATA_ROOT = PROJECT_ROOT / "static" / "data"
SCHEMA_PATH = PIPELINE_ROOT / "sql" / "schema.sql"

USER_AGENT = "personal-disc-golf-data-project/0.1 (+https://pova.github.io/personal/)"
PARSER_VERSION = "v1"


def ensure_data_dirs() -> None:
    for path in [RAW_ROOT, INTERIM_ROOT, PROCESSED_ROOT, STATIC_DATA_ROOT]:
        path.mkdir(parents=True, exist_ok=True)

