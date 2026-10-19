# PaddockView

A public motorsport dashboard, starting with Formula 1, that brings live race data, results, standings, schedules, news, highlights, and telemetry analysis into one place, with personalized and premium tools planned for later releases.

> 🚧 **Status: early development.** The project is still in planning. Features, architecture, and tech choices are all subject to change.

## Vision

**paddock-view** starts as an F1 dashboard and is planned to expand to other motorsports over time:

**WEC · WRC · IndyCar · NASCAR · MotoGP**

## Planned features

- **Live sessions** – real-time positions, gaps, tyre strategy, pit stops, and race control messages
- **Results & standings** – race, sprint, and qualifying results; driver and constructor championships
- **Schedule** – season calendar with session times in your local time zone
- **Telemetry** – lap comparisons, speed traces, throttle/brake data, and tyre degradation
- **AI analysis** – ask questions about a session and get insights based on telemetry and timing data
- **News & highlights** – motorsport headlines and official highlight videos
- **Fantasy** – tools to help with fantasy F1 picks and leagues

## Data sources (being evaluated)

- [Jolpica-F1](https://github.com/jolpica/jolpica-f1) – historical results, standings, and schedules
- [OpenF1](https://openf1.org) – timing, telemetry, and session data
- [FastF1](https://github.com/theOehrly/Fast-F1) – Python library for F1 session and telemetry data
- RSS feeds and the YouTube Data API – news and highlights

## Roadmap

- [ ] Project setup and architecture planning
- [ ] Schedule, results, and standings
- [ ] Historical telemetry analysis
- [ ] AI-assisted race analysis
- [ ] Live session data
- [ ] News and highlights
- [ ] Fantasy features
- [ ] Support for additional series

## Getting started

Start with the [documentation hub](docs/README.md) for the current implementation,
proposed requirements, user flows, architecture, data contracts, and roadmap.
The initial direction is a public Next.js application on Vercel, with search-friendly
content and future authenticated or premium tools. Supabase is the preferred backend
candidate; its first-release responsibilities remain under design.

See the [developer guide](docs/development.md) for local setup and the workflow
for keeping documentation and the Graphify index aligned with implementation.

## Disclaimer

paddock-view is an unofficial, personal project. It is not associated with Formula 1, the FIA, Formula One Management, or any other racing series, team, or rights holder. F1, FORMULA ONE, and related marks are trademarks of Formula One Licensing B.V. All data and media belong to their respective owners.
