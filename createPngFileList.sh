#!/bin/sh
# createPngFiles.sh

du -a | grep 'png$' | grep -v 'sampleSlide|Homework' | sort | perl -lpe 's/\S+\s+//;s/^/./' > Server/pngFiles
