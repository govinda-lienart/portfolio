---
title: "Tank setup"
description: "The observation tank, camera and recording protocol."
---

## The tank

A 35 × 21 × 23 cm side-view aquarium with an Anubias plant, dark gravel substrate
and PVC-pipe shelters. The fish are *Danio rerio*, a mix of GloFish and golden
morph, all labelled `danio_rerio`. The plant and pipes are deliberate: they create
the occlusion that makes identity persistence hard, which is the problem the
tracker and re-identification stages exist to solve.

## Recording

A phone camera films the whole tank from the side at 60 fps. Early recordings in
HEVC (H.265) produced washed-out frames when decoded by OpenCV, so recording was
switched to H.264 ("Most Compatible" mode) for deterministic decoding. See
[Stage 1](/portfolio/aquamind/stages/01-frame-extraction/).

## Videos in use

| Video | Contents | Used for |
|---|---|---|
| `IMG_0350.MOV` | 5 fish, 1 plant | Original main tracking video |
| `IMG_1839.MOV` | 5 fish | Re-identification work (Stage 6) |
| `IMG_2349.MOV` | 4 fish | Tracker ground truth (Stage 5), behaviour analysis (Stage 7), feeding experiment (Stage 8) |
| `IMG_0651.MOV` | 5 fish, 1 plant | Labelling reflections |
| `IMG_0764.MOV`, `IMG_9856.MOV` | 1 live + 1 dead fish | Low-fish-count / no-plant test cases |

## Database

A MySQL database (`aquamind`) holds five tables (`videos`, `frames`,
`annotation_sets`, `annotations` and `tracks`) running in a Docker container. The
`tracks` table is self-sufficient (it stores `frame_number`, `timestamp` and
`video_id` directly), so behaviour analysis reads it without joining back to
`frames`.
