variable "client_id" {
  description = "strava client_id"
}

variable "client_secret" {
  description = "strava client_secret"
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
