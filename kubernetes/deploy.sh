#!/bin/bash

# config (einmalig): 
:'
gcloud components install kubectl
gcloud components install gke-gcloud-auth-plugin
gcloud container clusters get-credentials quixotic-market-402317-gke --region=us-central1
// make registry public (read)
gcloud artifacts repositories add-iam-policy-binding cloud-project-registry --location=europe-west3 --member=allUsers --role=roles/artifactregistry.reader
kubectl config use-context docker-desktop/quixotic-market-402317-gke (je nachdem ob lokal oder gke)
'
# Nach gke cluster start (einmalig): 

kubectl apply -f ingress-controller.yaml
kubectl apply -f ingress.yaml
kubectl apply -f backend-secret.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f frontend-service.yaml

# ingress ip (static ip cloud-project 35.222.39.24):

:'
kubectl get service ingress-nginx-controller --namespace=ingress-nginx

when using prod envrionment:
change Strava callback url to ingress ip 
'
