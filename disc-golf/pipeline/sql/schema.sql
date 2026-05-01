create table if not exists source_snapshots (
    id bigserial primary key,
    source_name text not null,
    source_url text not null,
    fetched_at timestamptz not null,
    raw_path text not null,
    content_hash text not null unique,
    parser_version text not null default 'v1'
);

create table if not exists players (
    id bigserial primary key,
    pdga_number integer unique,
    name text not null,
    country text,
    handedness text,
    active boolean not null default true,
    created_at timestamptz not null default now()
);

create table if not exists player_rating_snapshots (
    id bigserial primary key,
    player_id bigint not null references players(id),
    rating integer not null,
    rating_date date not null,
    source_snapshot_id bigint references source_snapshots(id),
    unique (player_id, rating_date)
);

create table if not exists courses (
    id bigserial primary key,
    name text not null,
    city text,
    region text,
    country text,
    unique (name, city, region, country)
);

create table if not exists events (
    id bigserial primary key,
    source_event_id text,
    name text not null,
    start_date date,
    end_date date,
    tier text,
    tour_category text,
    is_major boolean not null default false,
    course_id bigint references courses(id),
    source_url text,
    unique (source_event_id, name, start_date)
);

create table if not exists event_results (
    id bigserial primary key,
    event_id bigint not null references events(id),
    player_id bigint not null references players(id),
    division text not null default 'MPO',
    place integer,
    total_score integer,
    total_to_par integer,
    payout numeric(12, 2),
    source_snapshot_id bigint references source_snapshots(id),
    unique (event_id, player_id, division)
);

create table if not exists rounds (
    id bigserial primary key,
    event_id bigint not null references events(id),
    player_id bigint not null references players(id),
    round_number integer not null,
    score integer,
    to_par integer,
    round_rating integer,
    position_after_round integer,
    source_snapshot_id bigint references source_snapshots(id),
    unique (event_id, player_id, round_number)
);

create table if not exists derived_metrics (
    id bigserial primary key,
    metric_scope text not null,
    metric_key text not null,
    player_id bigint references players(id),
    event_id bigint references events(id),
    season integer,
    metric_value numeric(14, 6) not null,
    computed_at timestamptz not null default now(),
    unique (metric_scope, metric_key, player_id, event_id, season)
);

create index if not exists idx_event_results_player on event_results(player_id);
create index if not exists idx_event_results_event on event_results(event_id);
create index if not exists idx_rounds_player_event on rounds(player_id, event_id);
create index if not exists idx_derived_metrics_lookup on derived_metrics(metric_scope, metric_key, player_id, season);

