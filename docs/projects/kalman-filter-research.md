---
title: Kalman Filter Research
description: Sensor-fusion experiments using an MPU6050, MicroPython, and R.
outline: deep
---

<p class="project-kicker">Research · Embedded Systems · Data Analysis</p>

# Kalman Filter Research

> Can two imperfect sensors produce a more trustworthy estimate together than either can alone?

<div class="project-links"><a href="https://github.com/KingofSaltyFish/Kalman-Filter-Research">View source on GitHub ↗</a></div>

## Interactive demo

The original experiment requires an MPU6050 sensor, so it cannot run directly in a browser. This simulation shows the same central idea: change the measurement noise and filter response to compare a noisy reading with the filtered estimate.

<KalmanDemo />

## Elevator pitch

I built a multi-experiment sensor pipeline around an MPU6050: MicroPython records accelerometer and gyroscope measurements, a Kalman filter estimates angle, and R scripts visualize how different approaches behave over time.

## Background and motivation

Physical sensors never return a perfectly clean answer. Accelerometers react to vibration, while integrating gyroscope readings accumulates drift. This project turns that conflict into an engineering question: how should a system balance a fresh measurement against its current prediction?

The repository records five experimental iterations, separating data collection from plotting so the same analysis can be repeated on new runs.

## System design

1. Wake and sample the MPU6050 over I²C.
2. Calibrate the gyroscope while the sensor is still.
3. Compute an accelerometer angle and integrate angular velocity.
4. Fuse both estimates through a predict–correct loop.
5. Save time-series measurements to CSV and analyze them in R.

## Tech stack

<ul class="tech-list"><li>MicroPython</li><li>MPU6050</li><li>I²C</li><li>Kalman filtering</li><li>CSV</li><li>R</li></ul>

## Core idea, in plain language

The filter first predicts the next angle from the gyroscope. It then asks how surprising the accelerometer measurement is. The Kalman gain decides how much of that surprise to accept.

```python:line-numbers {1,5,10-12}
# Predict from angular velocity
rate = measured_rate - bias
angle = angle + dt * rate

# Compare the prediction with the accelerometer
innovation = measured_angle - angle
innovation_uncertainty = covariance + measurement_noise
kalman_gain = covariance / innovation_uncertainty

# Correct the estimate
angle = angle + kalman_gain * innovation
bias = bias + bias_gain * innovation
```

The important design choice is not simply “average two sensors.” The contribution of each source changes with estimated uncertainty.

## Challenges and reflection

The hardest part of sensor fusion is separating algorithm error from hardware behavior. Calibration, sample timing, noise parameters, and sensor orientation all affect the result. Building five experiments created a repeatable path for comparing changes instead of judging a graph by eye.

The next research step is to document the setup and quantitative metrics—such as drift, response time, and error against a reference angle—directly in the repository.

## Evidence

- Five data-collection experiments
- Separate R plotting scripts for repeated analysis
- Automatic CSV naming and periodic flushing
- Explicit gyroscope calibration before each run
