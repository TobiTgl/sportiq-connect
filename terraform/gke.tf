# GKE cluster
data "google_container_engine_versions" "gke_version" {
  location = "${var.region}-c"
  version_prefix = "1.27."
}

resource "google_container_cluster" "primary" {
  name     = "${var.project_id}-gke"
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
  name       = google_container_cluster.primary.name
  location   = "${var.region}-c"
  cluster    = google_container_cluster.primary.name
  
  version = data.google_container_engine_versions.gke_version.release_channel_latest_version["STABLE"]
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

# secrets for backend deployment env vars

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

data "google_client_config" "default" {}
data "google_container_cluster" "primary" {
  name     = google_container_cluster.primary.name
  location = "${var.region}-c"
}

provider "kubernetes" {
  host                   = "https://${data.google_container_cluster.primary.endpoint}"
  token                  = data.google_client_config.default.access_token
  cluster_ca_certificate = base64decode(data.google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
}
