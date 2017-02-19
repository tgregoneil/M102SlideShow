#!/bin/sh
# createPngFiles.sh

du -a | grep 'png$' | egrep -v 'sampleSlide|Homework' | sort | perl -lpe 's/\S+\s+//;s/^/./' > Server/pngFiles
