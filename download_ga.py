#!/usr/bin/env python
from subprocess import call
import time

only_commands = list(['datasets', 'publishers', 'sitewide'])

#    call(ckan --plugin=ckanext-ga-report loadanalytics 2017-05 --config=/etc/ckan/production.ini, shell=True)

for i in range(1,13):
    for j in only_commands:
        if i < 10:
            i = "0" + str(i)
        month = "2015-" + str(i)
        call(["ckan", "--plugin=ckanext-ga-report", "loadanalytics", "only", j, month, "--config=/etc/ckan/production.ini"])
        time.sleep(5)
