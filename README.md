# houseBeatGenerator

*NOTE: this requires version 1.7.1 or greater of midi-writer-js.  As of this writing, it is not available in npm.  You will have to manually acquire and install version 1.7.1.*

Generates MIDI files with house beats.  Will generate 16-bar sections of

- mixin
- hardtrack1
- breakdown
- hardtrack2
- breakdown2
- hardtrack3
- mixout

by layering beat "components":

- kick
- mid-primary (main snare or clap)
- mid-secondary (accent snare or clap)
- tops-primary (main offbeat OHH or CHH)
- tops-secondary (accent beats or shaker)
- tops-power (generally, a ride used in hardtrack3)
- perc

Each beat component has a fixed list of patterns; one of these will be
randomly selected for each component.  These are specified in the files in
the patterns/ directory.  These files are a work in progress.   You may
not like some of the patterns, and may want to remove them or replace them.

The patterns contain MIDI notes, each with a drum name, a volume (0-100),
a start time (in ticks, 128PPQ), and a duration (in ticks, 128PPQ) 

Valid drum names:

- kick
- snare
- clap
- openhat
- closedhat
- shaker
- ride
- perc1
- perc2

The notes used for each drum default to GM standard.  However, you can supply
a configuration file to map your own notes to each drum.  Things get really
interesting if you specify multiple notes for each drum; one note will
be randomly selected when the kit is rebuilt.

This is intended for use with something like the Ableton Live Drum Rack,
where you load a drum rack with dozens of samples -- lots of kicks, lots of
snares, lots of claps, etc.

Put your config into $CONFIG/configstore/houseBeatGenerator.json (use the
included file as an example)

Then you can let HBG generate a random drum kit, build a beat from random
components and tweak from there.

You can use an interactive mode to play with the beat before saving
it so you don't waste time with MIDI files containing beats you don't like.

Specify the "-p" option for preview, and the "-m" option to specify
a MIDI port to send the notes to.

On Mac, you need to turn on a virtual MIDI bus:
https://help.ableton.com/hc/en-us/articles/209774225-Using-virtual-MIDI-buses

On Windows, you will need to install software to get a virtual midi port.  Here are two alternatives:

- loopMidi: http://www.tobias-erichsen.de/software/loopmidi.html
- MidiYoke, as part of MIDIOX: http://www.midiox.com/


Example usage:

```
./hbg -o /tmp/foo.mid
```

writes the full beat (all 7 sections) to `/tmp/foo.mid`.

```
./hbg -o /tmp/foo.mid -s 16 -S 65 -p -m 0
```

opens the interactive mode (preview), opens MIDI port 0, turns on 16/65 swing,
and when you specify you want to save a beat, it will write to `/tmp/foo.mid`
