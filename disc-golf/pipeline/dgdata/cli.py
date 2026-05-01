from __future__ import annotations

import argparse
import json

from .db import apply_schema, load_dataset
from .export import export_static_data
from .parse import parse_seed_dataset
from .sources import SOURCES


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Disc golf data pipeline")
    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser("audit", help="Print the source audit registry")
    subparsers.add_parser("export", help="Build processed JSON for the website")
    subparsers.add_parser("schema", help="Apply the Postgres schema using DATABASE_URL")
    subparsers.add_parser("load-seed", help="Load seed data into Postgres using DATABASE_URL")
    return parser


def main() -> None:
    args = build_parser().parse_args()

    if args.command == "audit":
        print(json.dumps([source.__dict__ for source in SOURCES], indent=2))
        return

    if args.command == "export":
        analysis = export_static_data()
        print(
            f"Exported {len(analysis['players'])} players and "
            f"{len(analysis['field_adjusted_results'])} event results."
        )
        return

    if args.command == "schema":
        apply_schema()
        print("Applied Postgres schema.")
        return

    if args.command == "load-seed":
        load_dataset(parse_seed_dataset())
        print("Loaded seed dataset into Postgres.")
        return


if __name__ == "__main__":
    main()

