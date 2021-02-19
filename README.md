# Timelapse Builder #

This application is meant to work with https://github.com/Al3xCalibur/CanvasReplace
It fetches canvas data, process it into a PNG picture and save it with a timestamp.
This allow to process the picture later to create timelapses.

## Requirements ##

This application has been tested with nodejs 14.
You can also run it with `docker-compose`.

## Usage ##

`.env`
```bash
DEFAULT_COLOR="#ffffff"
INSTANCES_FILE="./instances.json"
CRON_INTERVAL='* * * * *'
```

`instances.json`
```json
[
	{
		"folder": "name1",
		"url": "https://path.to.url/json"
	},
	{
		"folder": "name2",
		"url": "https://path.to.url/path2/json"
	}
]
```
