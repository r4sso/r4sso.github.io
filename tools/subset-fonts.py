#!/usr/bin/env python3
"""Re-subset the Iosevka fonts to the characters this site actually uses.

The full Iosevka web fonts carry every glyph the font has: 48 KB for the two
weights the navbar needs. The site only writes with a fraction of them, so the
shipped fonts keep just those glyphs: 16 KB.

The full fonts live in tools/fonts/ (never published). This script cuts them
down to the characters found in the content and the templates and writes the
result to themes/myTheme/static/fonts/.

Run it after adding content with characters that are not in the font yet:

    pip install brotli fonttools
    python3 tools/subset-fonts.py

Characters the font does not have (arrows, box drawing, curly quotes) fall back
to the next monospace font in the stack, so they never needed a glyph here.
"""

import glob
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE_FONTS = os.path.join(ROOT, "tools", "fonts")
TARGET_FONTS = os.path.join(ROOT, "themes", "myTheme", "static", "fonts")
SOURCES = [
    "content/**/*.md",
    "themes/myTheme/layouts/**/*.html",
    "themes/myTheme/layouts/**/*.xml",
    "themes/myTheme/layouts/**/*.txt",
    "themes/myTheme/assets/css/main.css",
    "themes/myTheme/assets/js/*.js",
    "config.toml",
]

# ASCII, plus the punctuation a personal site writes with. Characters the font
# does not have (arrows, box drawing) are free to add here: they fall back to
# the next monospace font in the stack and cost no glyph.
EXTRA = "·—–‘’“”…«»©"


def characters():
    used = set(EXTRA)
    files = []
    for pattern in SOURCES:
        files += glob.glob(os.path.join(ROOT, pattern), recursive=True)

    for path in files:
        with open(path, encoding="utf-8", errors="ignore") as handle:
            used |= set(handle.read())

    used |= set(chr(code) for code in range(0x20, 0x7F))
    return sorted(c for c in used if c.isprintable() or c == " ")


def subset(name, chars_file, flavor):
    source = os.path.join(SOURCE_FONTS, name + ".woff2")
    target = os.path.join(TARGET_FONTS, name + "." + flavor)

    subprocess.run(
        [
            "pyftsubset",
            source,
            "--text-file=" + chars_file,
            "--output-file=" + target,
            "--flavor=" + flavor,
            "--no-hinting",
            "--desubroutinize",
            "--drop-tables+=DSIG",
        ],
        check=True,
    )

    print(
        "%-16s %6d -> %6d bytes"
        % (name + "." + flavor, os.path.getsize(source), os.path.getsize(target))
    )


def main():
    if not os.path.isdir(SOURCE_FONTS):
        sys.exit("full fonts not found: " + SOURCE_FONTS)

    chars = characters()
    chars_file = os.path.join(TARGET_FONTS, ".subset-chars.txt")
    with open(chars_file, "w", encoding="utf-8") as handle:
        handle.write("".join(chars))

    print("%d characters in use" % len(chars))

    for name in ("iosevka", "iosevka-bold"):
        subset(name, chars_file, "woff2")
        subset(name, chars_file, "woff")

    os.remove(chars_file)


if __name__ == "__main__":
    main()
