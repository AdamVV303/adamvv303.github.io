# Posting to In My Own Words

Live page: https://adamvv303.github.io/journal/

## Add an entry from your phone
1. Record a 30–60 second video. Export an MP4 with H.264 video and AAC audio for broad browser support. Portrait and landscape both work.
2. In this repository, open journal, choose Add file → Upload files, and upload your video into journal/media. Create the media folder through the upload path if needed. Use a short filename with no spaces, such as first-reflection.mp4. Compress large clips before uploading.
3. Open journal/posts.json and select the pencil to edit.
4. Add an entry using the example below, replacing all example text with your own. If entries already exist, separate objects with commas.
5. Commit the change. The entry appears after GitHub Pages finishes deploying. Newest dates appear first.

This is a static journal: there is no sign-in or upload button on the public page. Publishing happens through GitHub.

## Example posts.json
```json
[
  {
    "title": "Your video title",
    "date": "2026-10-23",
    "topic": "Reflections",
    "description": "A short introduction in your own words.",
    "video": "/journal/media/first-reflection.mp4",
    "captions": "/journal/media/first-reflection.vtt",
    "transcript": "Replace this with the words spoken in your video."
  }
]
```

Use an actual publication date. Suggested topics: State of mind, Reflections, Recovery stories, Living with a disability, Everyday life.
Video paths must begin with /journal/media/. An optional poster image can use the same folder.
The captions field is optional; omit it until you have uploaded the matching WebVTT file. Include a transcript so people can read the entry.

## Caption file example
Save as first-reflection.vtt, replacing the sample words and timings:
```text
WEBVTT

00:00:00.000 --> 00:00:04.000
Your spoken words here.
```

## Edit or remove
Edit the entry in posts.json to change its title, description, or transcript. Remove its object to take it off the journal. Keep JSON valid: no trailing commas.

The website and this repository are public. Publish only the personal details you choose to share; deleting an entry from the page does not erase previous Git history.
