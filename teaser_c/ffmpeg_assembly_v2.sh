#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p build
FONT=/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf
for name in shot1_vatican_night shot2_archive_interior shot3_server_room shot4_control_room; do
 test -s "assets/$name.jpg" || { echo "Missing assets/$name.jpg"; exit 1; }
done
test -s assets/cover.png || { echo "Missing cover"; exit 1; }
GRADE="eq=saturation=0.85:contrast=1.05:brightness=-0.02"
for n in 1 2 3 4; do
 case "$n" in
 1) name=shot1_vatican_night; frames=90; z="1.08-0.08*on/89";;
 2) name=shot2_archive_interior; frames=90; z="1.0+0.04*on/89";;
 3) name=shot3_server_room; frames=90; z="1.0+0.10*on/89";;
 4) name=shot4_control_room; frames=120; z="1.0+0.12*on/119";;
 esac
 ffmpeg -y -hide_banner -loglevel error -loop 1 -framerate 30 -i "assets/$name.jpg" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='$z':d=1:x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':s=1080x1920:fps=30,$GRADE" -frames:v "$frames" -an -c:v libx264 -pix_fmt yuv420p "build/shot$n.mp4"
done
ffmpeg -y -hide_banner -loglevel error -f lavfi -i "color=black:s=1080x1920:r=30:d=3" -vf "drawtext=fontfile=$FONT:text='GLOBAL INTERPRETIVE BROADCAST':fontsize=30:fontcolor=white:x=(w-text_w)/2:y=h/2-100,drawtext=fontfile=$FONT:text='[====================] 99%%':fontsize=30:fontcolor=white:x=(w-text_w)/2:y=h/2,drawtext=fontfile=$FONT:text='INITIATING...':fontsize=30:fontcolor=gray:x=(w-text_w)/2:y=h/2+90" -frames:v 90 -c:v libx264 -pix_fmt yuv420p build/shot5.mp4
ffmpeg -y -hide_banner -loglevel error -f lavfi -i "color=black:s=1080x1920:r=30:d=1" -frames:v 30 -c:v libx264 -pix_fmt yuv420p build/shot6.mp4
ffmpeg -y -hide_banner -loglevel error -f lavfi -i "color=black:s=1080x1920:r=30:d=1.5" -vf "drawtext=fontfile=$FONT:text='BROADCAST CANCELLED':fontsize=35:fontcolor=white:x=(w-text_w)/2:y=h/2-45:alpha='min(1,t/0.3)',drawtext=fontfile=$FONT:text='FIDELITY THRESHOLD NOT MET':fontsize=32:fontcolor=white:x=(w-text_w)/2:y=h/2+30:alpha='min(1,t/0.3)'" -frames:v 45 -c:v libx264 -pix_fmt yuv420p build/shot7.mp4
ffmpeg -y -hide_banner -loglevel error -f lavfi -i "color=black:s=1080x1920:r=30:d=1.5" -loop 1 -i assets/cover.png -filter_complex "[1:v]scale=850:1200:force_original_aspect_ratio=decrease[cover];[0:v][cover]overlay=(W-w)/2:(H-h)/2-130:shortest=1,drawtext=fontfile=$FONT:text='dominusbooks.com':fontsize=38:fontcolor=white:x=(w-text_w)/2:y=1630,fade=in:st=0:d=0.3[v]" -map '[v]' -frames:v 45 -c:v libx264 -pix_fmt yuv420p build/shot8.mp4
: > build/concat.txt
for n in {1..8}; do printf "file 'shot%s.mp4'\n" "$n" >> build/concat.txt; done
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i build/concat.txt -c:v libx264 -crf 18 -pix_fmt yuv420p -an build/silent.mp4
SOURCE=build/silent.mp4
if test -s assets/voiceover.mp3; then
 ffmpeg -y -hide_banner -loglevel error -i "$SOURCE" -i assets/voiceover.mp3 -filter_complex "[1:a]apad=pad_dur=20[a]" -map 0:v -map '[a]' -t 20 -c:v copy -c:a aac build/audio.mp4
 SOURCE=build/audio.mp4
fi
if test -s subtitles_EN.srt; then
 ffmpeg -y -hide_banner -loglevel error -i "$SOURCE" -vf "subtitles=subtitles_EN.srt:force_style='FontName=DejaVu Sans,FontSize=18,Outline=2,Alignment=2,MarginV=160'" -c:v libx264 -crf 18 -c:a copy DOMINUS_THE_BROADCAST_v2.mp4
else cp "$SOURCE" DOMINUS_THE_BROADCAST_v2.mp4; fi
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of default=noprint_wrappers=1 DOMINUS_THE_BROADCAST_v2.mp4
