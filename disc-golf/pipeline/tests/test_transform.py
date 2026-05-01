import unittest

from dgdata.parse import parse_seed_dataset
from dgdata.transform import build_analysis


class TransformTests(unittest.TestCase):
    def test_focus_summary_is_generated(self) -> None:
        analysis = build_analysis(parse_seed_dataset())

        self.assertEqual(analysis["focus"]["name"], "Gannon Buhr")
        self.assertGreaterEqual(analysis["focus"]["wins"], 1)
        self.assertIsNotNone(analysis["focus"]["average_round_rating"])

    def test_final_round_movement_includes_focus_player(self) -> None:
        analysis = build_analysis(parse_seed_dataset())

        focus_movements = [
            row
            for row in analysis["final_round_movement"]
            if row["pdga_number"] == analysis["metadata"]["focus_pdga_number"]
        ]

        self.assertTrue(focus_movements)
        self.assertTrue(all("places_gained_final_round" in row for row in focus_movements))


if __name__ == "__main__":
    unittest.main()

