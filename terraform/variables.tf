variable "client_id" {
  description = "strava client_id"
}

variable "client_secret" {
  description = "strava client_secret"
}

variable "deployment_name" {
  description = "Name of deployment"
  default = "sportiqconnect"
}

variable "env" {
  description = "The environment (dev or prod)"
}

variable "gke_num_nodes" {
  default     = 2
  description = "number of gke nodes"
}

variable "project_id" {
  description = "project id"
}

variable "region" {
  description = "region"
}

variable "tls_crt" {}
variable "tls_key" {}