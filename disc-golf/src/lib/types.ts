export type PlayerSummary = {
  pdga_number: number;
  name: string;
  starts: number;
  wins: number;
  podiums: number;
  top5s: number;
  top10s: number;
  win_rate: number;
  podium_rate: number;
  average_finish: number;
  average_round_rating: number | null;
  rating_std_dev: number;
  best_round_rating: number | null;
};

export type FieldAdjustedResult = {
  event_id: string;
  event_name: string;
  season: number;
  player_name: string;
  pdga_number: number;
  place: number;
  tour_category: string;
  is_major: boolean;
  finish_percentile: number;
  strokes_vs_seed_field: number;
};

export type RoundResult = {
  source_event_id: string;
  pdga_number: number;
  round_number: number;
  score: number;
  to_par: number;
  round_rating: number;
  season: number;
  event_name: string;
  player_name: string;
};

export type FinalRoundMovement = {
  event_id: string;
  event_name: string;
  season: number;
  player_name: string;
  pdga_number: number;
  position_before_final: number;
  final_position: number;
  places_gained_final_round: number;
};

export type AnalysisPayload = {
  metadata: {
    title: string;
    focus_pdga_number: number;
    dataset_note: string;
    seasons: string[];
  };
  focus: PlayerSummary;
  players: PlayerSummary[];
  field_adjusted_results: FieldAdjustedResult[];
  focus_results: FieldAdjustedResult[];
  focus_rounds: RoundResult[];
  final_round_movement: FinalRoundMovement[];
};

