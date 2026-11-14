#!/usr/bin/env python3
"""Original DOMINUS 12-second cinematic soundtrack.
Synthetic choral vowels, string-like orchestral layers and analog pulses.
No samples, interpolations or copyrighted recordings. Deterministic output.
"""
import array
import math
import random
import wave
from pathlib import Path

RATE = 22050
LENGTH = 12
N = RATE * LENGTH
rng = random.Random(2035)
buf = array.array("h")
TWOPI = math.tau
# Four measures at 80 BPM, Dm - Bb - F - C. Each lasts exactly three seconds.
chords = [(146.83, 174.61, 220.0), (116.54, 146.83, 174.61),
          (130.81, 174.61, 220.0), (130.81, 164.81, 196.0)]
def envelope(t, start, end, attack=.4, release=.8):
    if t < start or t >= end:
        return 0.
    return min(1., (t-start)/attack if attack else 1., (end-t)/release if release else 1.)

def choir(freq,t):
    # Formant-rich non-verbal sung vowel, NOT a human or sampled voice.
    p = TWOPI * freq * t
    return (0.55*math.sin(p) + 0.22*math.sin(2*p) +
            0.15*math.sin(3*p) + 0.08*math.sin(5*p))

def strings(freq,t):
    p = TWOPI * freq * t
    return (math.sin(p) + .22*math.sin(2*p+.09*math.sin(.7*t))
            + .12*math.sin(3*p)) / 1.34

for n in range(N):
    t = n/RATE
    chord_index=min(3,int(t/3))
    chord=chords[chord_index]
    chstart=3*chord_index
    a=envelope(t,0,12,2.2,1.0)
    total=0.
    # Long orchestral string chords, controlled vibrato.
    for j,f in enumerate(chord):
        f2=f*(1+.0008*math.sin(TWOPI*(4.2+j*.6)*t))
        total+=.105*a*strings(f2,t)
    # Synthetic, wordless choral voices bloom above the string register.
    bloom=envelope(t,1.1,11.85,2.2,1.4)
    total+=.15*bloom*choir(chord[0]*2,t)
    total+=.115*bloom*choir(chord[2]*2.004,t)
    # A deep orchestral pedal tone enters every measure.
    pedal=chord[0]/2
    total+=.22*envelope(t,chstart,chstart+3,.16,.60)*math.sin(TWOPI*pedal*t)
    # Rhythmic synth pulses (eighth notes) with rounded attacks.
    step=int(t/.375)
    frac=(t%0.375)
    pulseen=min(1.,frac/.018)*math.exp(-frac*12)
    pulse=chord[(step//2)%3]*2
    total+=.085*pulseen*(math.sin(TWOPI*pulse*t)+.28*math.sin(TWOPI*(pulse*.5)*t))
    # Subtle impact at 0 / 3 / 6 / 9 sec, with dissipating low-frequency tail.
    since=t-chstart
    total+=.17*math.exp(-since*7)*math.sin(TWOPI*(63-22*min(.5,since))*since)
    # Glints of airy, high-frequency electronic texture.
    total+=.018*a*math.sin(TWOPI*(523.25 + 4*math.sin(TWOPI*.11*t))*t)
    # Final cinematic resolve, gentle noise swell and silence by 12.0.
    swell=envelope(t,8.5,11.92,.7,.4)
    total+=.045*swell*(rng.random()*2-1)
    fade=min(1.,max(0.,t/.09),max(0.,(LENGTH-t)/.35))
    # Conservative volume and smooth saturation to prevent clipping.
    sample=math.tanh(total*.86)*.82*fade
    buf.append(int(max(-1.,min(1.,sample))*32767))

output=Path("assets/dominus-original-score.wav")
output.parent.mkdir(parents=True,exist_ok=True)
with wave.open(str(output),"wb") as out:
    out.setnchannels(1)
    out.setsampwidth(2)
    out.setframerate(RATE)
    out.writeframes(buf.tobytes())
print(f"Generated {output}: {LENGTH}s, {RATE}Hz, mono; original procedural score")
