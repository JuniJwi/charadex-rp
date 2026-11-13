import json
import os
import tempfile
from datetime import datetime, timezone
from email.utils import format_datetime
from xml.sax.saxutils import escape

# !! ------------------------------------------------- !!
# variables you must update
# !! ------------------------------------------------- !!
SITE_NAME = 'Charadex: RP'
SITE_URL = 'https://junijwi.github.io/charadex-rp/'
ACTIVITY_SHEET_ID = '1LvIIvAVdC6i-HHe35ukdlBd5dDdwqwwquaFA6jKuZOU'
SHEET_PAGES = [
    'announcements',
    'events',
    'event posts'
]

# .. ------------------------------------------------- ..
# variables you don't need to change
# .. ------------------------------------------------- ..
GSHEET_JSON_URL = 'https://docs.google.com/spreadsheets/d/{sheetID}/gviz/tq?tqx=out:json&headers=1&tq=WHERE A IS NOT NULL&sheet={sheetPage}'
OUT_XML_PATH = 'public/{sheetPage}_feed.xml'
LIMIT = 20


# .. ------------------------------------------------- ..
# helper functions
# .. ------------------------------------------------- ..
def getSource(sheetID, sheetPage):
    """
    Retrieve the .json for this RSS feed
    """

    # This google sheet url retrieves the spreadsheet in JSON format
    # similar to how we're doing it in javascript :)
    source = GSHEET_JSON_URL.format(
        sheetID = sheetID,
        sheetPage = sheetPage,
    )

    # Open the JSON
    with open(source, encoding='utf-8') as handle:
      sheetJSON = json.load(handle)
      return sheetJSON


def filterPosts(posts, sheetPage):
    """
    Remove hidden and scheduled posts.
    """
    # remove hidden posts
    visible = [p for p in posts if not p['hide']]

    # remove scheduled posts
    now = datetime.now(timezone.utc)
    posted = [p for p in visible if p['timestamp'] <= now]
    posted = posted[:LIMIT]
    if not posted:
        print(f'No visible posted items for {sheetPage}.')

    # we COULD remove things from the RSS based on start time
    # however the intention is that prompts go up AHEAD of time
    # so if you want to schedule those, use timestamp.

    return posted

def createItems(posts, sheetPage):
    """
    Create the XML Items
    """
    # Create the actual XML items
    items = []
    for post in posts:
        items.append(
            '<item>'
            f'<title>{escape(post["title"])}</title>'
            f'<category>{escape(post["type"])}</category>'
            f'<link>{SITE_URL}/{sheetPage}/{escape(post["id"])}</link>'
            f'<guid isPermaLink="false">{escape(post["id"])}</guid>'
            f'<pubDate>{format_datetime(post["timestamp"], usegmt=True)}</pubDate>'
            f'<description>{escape(post["summary"])}</description>'
            '</item>'
        )
    return items

# .. ------------------------------------------------- ..
# main logic
# .. ------------------------------------------------- ..
def main():
    for sheetPage in SHEET_PAGES:
        posts = getSource(ACTIVITY_SHEET_ID, sheetPage)
        filteredPosts = filterPosts(posts, sheetPage)

        filteredPosts.sort(key=lambda p: p['timestamp'], reverse=True)
        newest = format_datetime(filteredPosts[0]['timestamp'], usegmt=True)
    
        items = createItems(filteredPosts, sheetPage)

        # Now make the final XML file
        xml = (
            '<?xml version="1.0" encoding="UTF-8"?>'
            '<rss version="2.0"><channel>'
            f'<title>{sheetPage}</title>'
            f'<category>{sheetPage}</category>'
            f'<link>{SITE_URL}/{sheetPage}/</link>'
            f'<description>{SITE_NAME} - {sheetPage}</description>'
            f'<lastBuildDate>{newest}</lastBuildDate>'
            + ''.join(items)
            + '</channel></rss>'
        )

        # save the XML file
        out_path = OUT_XML_PATH.format(sheetPage = sheetPage.replace(' ',''))
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        handle, temp_path = tempfile.mkstemp(dir=os.path.dirname(out_path), suffix='.tmp')
        with os.fdopen(handle, 'w', encoding='utf-8') as out:
            out.write(xml)
        os.replace(temp_path, out_path)


if __name__ == '__main__':
    main()