provider "google" {
  credentials = file("./gke-service-account-key.json")
  project     = "gke-ishan"
  region      = "us-central1"
}

resource "google_container_cluster" "primary" {
  name               = "gke-cluster"
  location           = "us-central1-c"
  remove_default_node_pool = true
	initial_node_count       = 1
}

resource "google_container_node_pool" "primary_nodes" {
	name = "node-pool"
	location = "us-central1-c"
	cluster = google_container_cluster.primary.name
	node_count = 1

	node_config {
      machine_type = "e2-medium"
      disk_size_gb = 10
      disk_type    = "pd-standard"
      image_type   = "COS_CONTAINERD"
   }

    provisioner "local-exec" {
    command = "./create-volume.sh"
  }
}