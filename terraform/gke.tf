# GKE cluster
data "google_container_engine_versions" "gke_version" {
  location       = "${var.region}-c"
  version_prefix = "1.27."
}

resource "google_container_cluster" "primary" {
  name     = "${var.deployment_name}-gke-${var.env}"
  location = "${var.region}-c"

  # We can't create a cluster with no node pool defined, but we want to only use
  # separately managed node pools. So we create the smallest possible default
  # node pool and immediately delete it.
  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
  addons_config {
    http_load_balancing {
      disabled = true
    }
  }
}

# Separately Managed Node Pool
resource "google_container_node_pool" "primary_nodes" {
  name     = google_container_cluster.primary.name
  location = "${var.region}-c"
  cluster  = google_container_cluster.primary.name

  version    = data.google_container_engine_versions.gke_version.release_channel_latest_version["STABLE"]
  node_count = var.gke_num_nodes

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]

    labels = {
      env = var.project_id
    }

    machine_type = "n1-standard-1"
    tags         = ["gke-node", "${var.project_id}-gke"]
    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}

resource "kubernetes_namespace" "company" {
  metadata {
    annotations = {
      name = "company-namespace"
    }
    name = "company"
  }
  depends_on = [google_container_node_pool.primary_nodes]
}

# secrets for backend deployment env vars
resource "kubernetes_secret" "secrets_company" {
  metadata {
    name      = "backend-secrets"
    namespace = kubernetes_namespace.company.metadata.0.name
  }
  data = {
    CLIENT_ID     = "${var.client_id}"
    CLIENT_SECRET = "${var.client_secret}"
  }

  type = "Opaque"
}

# secrets for backend deployment company env vars
resource "kubernetes_secret" "secret" {
  metadata {
    name = "backend-secrets"
  }
  data = {
    CLIENT_ID     = "${var.client_id}"
    CLIENT_SECRET = "${var.client_secret}"
  }

  type = "Opaque"
}

# TLS Secret for default namespace
resource "kubernetes_secret" "tls_secret_default" {
  metadata {
    name      = "tls-secret"
    namespace = "default"
  }

  data = {
    "tls.crt" = "${base64decode(var.tls_crt)}"
    "tls.key" = "${base64decode(var.tls_key)}"
  }

  type = "kubernetes.io/tls"
}

# TLS Secret for company namespace
resource "kubernetes_secret" "tls_secret_company" {
  metadata {
    name      = "tls-secret-company"
    namespace = kubernetes_namespace.company.metadata.0.name
  }

  data = {
    "tls.crt" = "${base64decode(var.tls_crt_company)}"
    "tls.key" = "${base64decode(var.tls_key_company)}"
  }

  type = "kubernetes.io/tls"
}

data "google_client_config" "default" {}

provider "kubernetes" {
  host                   = "https://${google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}

# state of terraform infrastructure
terraform {
  backend "gcs" {
    bucket = "htwg-cloud-project"
  }
}
