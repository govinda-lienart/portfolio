---
title: "Pipeline overview"
description: "How the stages fit together, end to end."
---

AquaMind runs as an ordered set of scripts, each reading the previous stage's
output: frames and annotations in MySQL, then per-run parquet files for tracking
and behaviour.

```text
video_metadata.xlsx → sync_videos.py        register video metadata in MySQL
      ↓
extract_frames.py       1 frame/sec → MySQL frames table
      ↓
Label Studio            label bounding boxes → YOLO-format export
      ↓
store_annotations.py    parse export → MySQL annotations table
      ↓
prepare_dataset.py      MySQL → YOLO dataset folder (80/20 split)
      ↓
YOLOv8 fine-tuning      train on the dataset, log + register to MLflow
      ↓
tracker.py              YOLO detections → SORT-style tracker → tracks.parquet
                        + crops + annotated video
      ↓
analyse_behaviour.py / re-ID / behaviour classifiers   downstream analysis
```

## Stage map

| Stage | What it does | Status |
|---|---|---|
| 1 | Extract frames, store in MySQL | Done |
| 2 | Label fish, store annotations | Done |
| 3 | Fine-tune YOLOv8 + MLflow | Done |
| 3b | Auto-labelling pipeline (Label Studio ML backend) | Planned |
| 4 | Custom SORT-style tracker | Stable, still evolving |
| 5 | Evaluate detection and tracking | Done |
| 6 | Fish re-identification | Settled state |
| 7 | Behaviour classifier: chasing | In progress |
| 8 | Behaviour classifier: feeding strike (CNN + LSTM) | In progress |
| 9 | Anomaly detection / behaviour clustering | Upcoming |
| 10 | Full pipeline + cloud deployment | Upcoming |
| 11 | Active-learning loop | Upcoming |

## ML operations

`best.pt` is registered in the MLflow Model Registry
(`aquamind-yolo-detector`, alias `@champion`) rather than referenced by a
hardcoded path, so promoting a model is "re-run the logging script". Inference still
uses ultralytics' native `.boxes` API via a small `load_yolo()` resolver, not
generic pyfunc loading. DVC versions the datasets.
