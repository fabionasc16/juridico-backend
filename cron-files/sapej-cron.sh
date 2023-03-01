#!/bin/sh

sleeptime=30m # Sleep for 15 minutes after a failed try.
maxtries=4    # 8 * 15 minutes = about 2 hours total of waiting,
              # not counting running and failing.

while ! curl  -X POST http://localhost:3302/api/v1/processos/atualiza-prazos-processos -H "Accept: application/json" -H "Authorization: Bearer fissL805qU@"; do
        maxtries=$(( maxtries - 1 ))
        if [ "$maxtries" -eq 0 ]; then
                echo Failed >&2
                exit 1
        fi

        sleep "$sleeptime" || break
done