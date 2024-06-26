#!/bin/bash

gcloud container clusters get-credentials gke-cluster --zone us-central1-c
kubectl apply -f pvc.yaml