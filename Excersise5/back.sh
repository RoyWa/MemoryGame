#!/bin/bash
#dumps all tracked and modified/added files into tar
cd  service-watch
git status -s | awk '{print $2}' | xargs zip ~/BACK/back_$(date "+%Y-%m-%d.%H.%M.%S").zip | awk '{print $2 "  (" $4}' 

