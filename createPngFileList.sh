#!/bin/sh
# createPngFiles.sh

du -a | grep 'png$' | egrep -v 'sampleSlide|Homework|FinalExam' | perl -lpe 's/\S+\s+//;s/^/./' | sort > Server/pngFiles
