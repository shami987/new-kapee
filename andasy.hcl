# andasy.hcl app configuration file generated for kapee on Tuesday, 10-Mar-26 15:22:11 SAST
#
# See https://github.com/quarksgroup/andasy-cli for information about how to use this file.

app_name = "kapee"

app {

  env = {
    VITE_API_BASE_URL = "https://node-api-ezuc.onrender.com/api"
    VITE_API_TIMEOUT = "8000"
  }

  port = 8080

  primary_region = "fsn"

  compute {
    cpu      = 1
    memory   = 256
    cpu_kind = "shared"
  }

  process {
    name = "kapee"
  }

}
