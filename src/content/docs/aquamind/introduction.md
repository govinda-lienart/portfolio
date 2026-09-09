---
title: "Introduction"
description: "Background, motivation and goal of AquaMind."
---

## The problem

During a behavioural-ecology PhD I scored fish behaviour by hand, frame by frame,
for years: line crossings, feeding strikes, chases. It is slow, it does not
scale, and it is hard to keep consistent between observers. AquaMind automates
that scoring with a computer-vision pipeline.

## The goal

Detect and track *Danio rerio* reliably across video frames, even when fish are
occluded behind the plant or the pipes, and then use that tracking to measure
real behaviour (activity, bottom-dwelling, chasing, feeding strike) for a
**chemical-alarm-cue antipredator assay**, a standard paradigm in the field.

## Why this combination

The point of the project is the behavioural-ecologist × ML-engineer overlap. The
science side sets what the behaviours *mean* and how they are measured in the
field; the engineering side builds it end to end (data pipeline, detector,
tracker, re-identification, behaviour classifiers) with the experiment tracking
and dataset versioning a real project needs.

## Scope

AquaMind today is a developer pipeline: scripts, a local MySQL database, MLflow and
DVC, no GUI. `idtracker.ai` already serves non-coding biologists; AquaMind's value
here is the ML engineering and data architecture. A thin Streamlit/Gradio front
end and a Docker Compose bundle are a possible later step, not a requirement.
