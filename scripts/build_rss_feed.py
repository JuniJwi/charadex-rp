import json
import os
import tempfile
from urllib.request import urlopen
from datetime import datetime, timezone
from email.utils import format_datetime
from xml.sax.saxutils import escape
from xml.dom import minidom

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
GSHEET_JSON_URL = 'https://docs.google.com/spreadsheets/d/{sheetID}/gviz/tq?tqx=out:json&headers=1&tq=WHERE%20A%20IS%20NOT%20NULL&sheet={sheetPage}'
OUT_XML_PATH = 'public/{sheetPage}_feed.xml'
LIMIT = 20


# .. ------------------------------------------------- ..
# helper functions
# .. ------------------------------------------------- ..
def convertDate(googleDate):
    """
    Converts google's Date(Y,M,D,H,M,S) format to
    python datetime.
    """
    dateString = googleDate[5:-1]
    
    data = dateString.split(',')
    date = datetime(
        int(data[0]),
        int(data[1]),
        int(data[2]),
        int(data[3]),
        int(data[4]), 
        int(data[5]),
        tzinfo = timezone.utc
        )
    return date

def getSource(sheetID, sheetPage):
    """
    Retrieve the .json for this RSS feed
    """
    # This google sheet url retrieves the spreadsheet in JSON format
    # similar to how we're doing it in javascript :)
    source = GSHEET_JSON_URL.format(
        sheetID = sheetID,
        sheetPage = sheetPage.lower().replace(' ', ''),
    )

    # Open the URL that contains JSON
    response = urlopen(source)

    if response.getcode() == 200:
        # Remove headers
        text = response.read().decode('utf-8')
        text = text[47:-2]
        # Parse JSON in Python
        data = json.loads(text)

        # now convert to expected format...
        headers = []
        for header in data['table']['cols']:
            headers.append(header['label'].lower().replace(' ', ''))
        print(f'These are the headers: {headers}')

        # scrub and convert to readable object
        scrubbedData = []
        for row in data['table']['rows']:
            newRow = {}
            for ix, header in enumerate(headers):
                if row['c'][ix]:
                    newRow[header] = row['c'][ix]['v']
                    if isinstance(newRow[header], str) and 'Date' in newRow[header]:
                        newRow[header] = convertDate(newRow[header])
                else:
                    newRow[header] = None
            scrubbedData.append(newRow)
        # print(f'Here is the scrubbed data: {scrubbedData}')
        return headers, scrubbedData
    else:
        raise SystemExit(f'Unable to fetch JSON from sheets at {source}.')


def filterPosts(headers, posts, sheetPage):
    """
    Remove hidden and scheduled posts.
    """
    # remove hidden posts
    if 'hide' in headers:
      posts = [p for p in posts if not p['hide']]

    # remove future posts
    if 'timestamp' in headers:
      now = datetime.now(timezone.utc)
      posts = [p for p in posts if isinstance(p['timestamp'], datetime) and p['timestamp'] <= now]
      posts = posts[:LIMIT]
    if len(posts) <= 0:
        print(f'No visible posted items for {sheetPage}.')

    # we COULD remove things from the RSS based on start time
    # however the intention is that prompts go up AHEAD of time
    # so if you want to schedule those, use timestamp.

    return posts

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
            f'<link>{SITE_URL}/{sheetPage}/{escape(str(post["id"]))}</link>'
            f'<guid isPermaLink="false">{escape(str(post["id"]))}</guid>'
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
        headers, posts = getSource(ACTIVITY_SHEET_ID, sheetPage)
        filteredPosts = filterPosts(headers, posts, sheetPage)

        if len(filteredPosts) > 0:
            if 'timestamp' in headers:
                filteredPosts.sort(key=lambda p: p['timestamp'], reverse=True)
                newest = format_datetime(filteredPosts[0]['timestamp'], usegmt=True)
            else:
                newest = datetime.now(timezone.utc)
        
            items = createItems(filteredPosts, sheetPage)

            # Now make the final XML file
            xml = (
                '<?xml version="1.0" encoding="UTF-8"?>'
                '<rss version="2.0"><channel>'
                f'<title>{SITE_NAME.title()} - {sheetPage.title()}</title>'
                f'<category>{sheetPage}</category>'
                f'<link>{SITE_URL}/{sheetPage}/</link>'
                f'<description>{SITE_NAME} - {sheetPage}</description>'
                f'<lastBuildDate>{newest}</lastBuildDate>'
                + ''.join(items)
                + '</channel></rss>'
            )
            xml = minidom.parseString(xml)
            xml = xml.toprettyxml()
            # save the XML file
            out_path = OUT_XML_PATH.format(sheetPage = sheetPage.replace(' ',''))
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            handle, temp_path = tempfile.mkstemp(dir=os.path.dirname(out_path), suffix='.tmp')
            with os.fdopen(handle, 'w', encoding='utf-8') as out:
                out.write(xml)
            os.replace(temp_path, out_path)
            print(f'Created new XML file for {sheetPage}.')
        else:
            print(f'No XML was created for {sheetPage}.')


if __name__ == '__main__':
    main()