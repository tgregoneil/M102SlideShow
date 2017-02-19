#!/bin/sh
# createPngFiles.sh

du -a | grep 'png$' | egrep -v 'sampleSlide|Homework' | perl -lpe 's/\S+\s+//;s/^/./' | sort > Server/pngFiles
