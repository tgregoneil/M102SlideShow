#!/bin/sh
# createPngFiles.sh

du -a | grep 'png$' | egrep -v 'helpPopupTips|sampleSlide' | perl -lpe 's/\S+\s+//;s/^/./' | sort > Server/pngFiles
