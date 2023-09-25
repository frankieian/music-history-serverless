
# Music History Serverless

This repository holds the three serverless functions that run the data retrieval processes.

These functions are:
- scheduler: Schedules functions to run based on a criterior (e.g. run spotify retrieval process every 2 hours)
- history_adapter: Uses the music streaming service API to retrieve users recently played songs
- tag_identifier: Uses the last.fm API to retrieve the tags of songs. Gives genres per song basis