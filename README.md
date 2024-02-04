<!-- PROJECT LOGO -->
<br />
<div align="center">
    <img src="./frontend/public/favicon.svg" alt="Logo" width="80" height="80">
    <h3 align="center">Cloud Project</h3>
    <p align="center">
        Cloud Application Development Project
        <br>
        Team: Sahin Karakoc, Tobias Toegel, Nick Nowak
    </p>
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/HTWG-Nowak/cloud-project/build-and-push-image.yml">
</div>
<br/>
<br/>

<!-- ABOUT THE PROJECT -->

# Built with

These frameworks / libraries / service are used in the project.

[![Nest][nest-logo]][nest-url]
[![Vue][vue-logo]][vue-url]
[![Vuetify][vuetify-logo]][vuetify-url]
[![Github][github-logo]][github-url]
[![Google Cloud][google-cloud-logo]][google-cloud-url]

<br>
<br>

# Setup

## Dependencies

Following stuff must be installed on the system to run / build the applications.

- Node.js / npm
- Docker / docker compose

## Development

The commands for each application can be found in the subfolders

## Build

```bash
# build applikation with docker
$ docker-compose up -d

# build backend with docker
$ docker build ./backend -t cloud-project-backend

# build frontend with docker
$ docker build ./frontend -t cloud-project-frontend
```

## gcloud
necessary gcloud services: compute, firestore, artifact registry, cloud storage, kubernetes engine, vpc
```bash
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud services enable compute.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable container.googleapis.com
gcloud services enable identitytoolkit.googleapis.com
gcloud iam service-accounts create <SERVICE_ACCOUNT_NAME>
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/compute.admin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/container.clusterAdmin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/container.admin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/editor"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/firebasestorage.admin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/firestore.serviceAgent"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/iam.securityAdmin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/iam.serviceAccountTokenCreator"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/resourcemanager.projectIamAdmin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/artifactregistry.admin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="firebaseauth.admin"
gcloud projects add-iam-policy-binding cloud-abgabe --member="serviceAccount:<SERVICE_ACCOUNT_NAME>@<PROJECT_ID>.iam.gserviceaccount.com" --role="roles/firebase.sdkAdminServiceAgent"
gcloud artifacts repositories create cloud-project-registry --repository-format=docker --location=europe-west3
gcloud artifacts repositories add-iam-policy-binding cloud-project-registry --location=europe-west3 --member=allUsers --role=roles/artifactregistry.reader
gcloud firestore databases create --location=europe-west3 --database=cloud-project
gcloud compute addresses create cloud-project-prod --global --ip-version=IPV4
gcloud compute addresses describe cloud-project-prod --global 
-> add ip to ingress-controller-prod.yaml (loadbalancer ip line 351 or leave out & ingress controller will automatically choose an ip (not static))
gcloud storage buckets create gs://htwg-cloud-project-<NUMBER> (name der noch frei ist)
-> in gke.tf change bucked name to bucked you created

optional:
gcloud components install kubectl
gcloud components install gke-gcloud-auth-plugin
```
manual steps:
- activate identity platform in gcloud console (didn't find the command)
- add provider email/password
- activate multitenancy: gcloud -> Identity Platform -> Multitenancy -> Settings -> activate
- add identity platform api & auth domain to frontend .env file (identity platform  -> Provider -> Application setup details)
- add Tenants (Free, Standard, Company)
- create Strava dev application in your strava account. Add your callback domain for strava auth flow 
- Add strava client id & secret to backend .env & github actions secret

secrets for gh-actions workflow:
PROJECT_ID: ID of your gcloud project
REGION: region of your kubernetes cluster
CLIENT_ID: id of your strava dev account (enable in your strava account)
CLIENT_SECRET: secret from strava dev account
TLS_CRT: TLS certificate (base64 encoded)
TLS_KEY: TLS private key (base64 encoded)
TLS_CRT_COMPANY: TLS certificate (base64 encoded)
TLS_KEY_COMPANY: TLS private key (base64 encoded)
FIREBASE_SERIVCE_ACCOUNT: serivce account with firebase permissions (for demo purposes same as gh actions serivce account) (base64 encoded json file content)
GCP_CREDENTIALS: gcloud service account credentials json
-   gcloud -> IAM -> Service account -> create service account, roles (kubernetes engine admin, compute admin, artifact registry admin, firestore admin, Security administrator/Sicherheitsadministrator, Service Account Key Creator/Ersteller von Dienstkonto-Tokens, basic editor/bearbeiter (gcloud roles are a huge pain so I just gave up and used editor role)) -> add key (json)

## License

This project uses dependencies under the [MIT licensed](LICENSE).

<!-- MARKDOWN LINKS & IMAGES -->

[vue-logo]: https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D
[vue-url]: https://vuejs.org/
[vuetify-logo]: https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=AEDDFF
[vuetify-url]: https://vuetifyjs.com/en/
[nest-logo]: https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white
[nest-url]: https://nestjs.com/
[github-logo]: https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white
[github-url]: https://github.com/
[google-cloud-logo]: https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white
[google-cloud-url]: https://cloud.google.com/
