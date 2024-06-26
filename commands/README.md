
```
# active account name 
gcloud auth list
```

```
# Terraform
terraform init
terraform apply
```

```
# Git related
git config --global user.email <email> 
git config --global user.name <name>
git remote add <remote-name> <url>
git clone <url> <repo-name>
```

```
# Enable Services
gcloud services enable container.googleapis.com \
    cloudbuild.googleapis.com \
    sourcerepo.googleapis.com \
    containeranalysis.googleapis.com
```

```
# Create Artifact Repository
gcloud artifacts repositories create <repo-name> \
  --repository-format=docker \
  --location=<location>
```

```
# Create Source Repository
gcloud source repos create <source-repo-name> 
```


```
# establish necessary configuration to access and manage specific cluster via kubectl
export my_zone=<zone>
export my_cluster=<cluster>
gcloud container clusters get-credentials $my_cluster --zone $my_zone
```

```
# Kubectl commands
kubectl get persistentvolumeclaim

kubectl get pod

kubectl get pods

kubectl exec -it <pod-name> -- /bin/sh

kubectl apply -f <name>.yaml

kubectl describe pods

kubectl logs <pod-name>
```

