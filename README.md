# Pastebin Clone API

## About This Project
This project is a clone of the Pastebin app which iss used to store texts for easy sharing and retrieval.
The infrastructure of this project is set up using Terraform, Google Cloud Platform,and CircleCI.
CircleCI was used for the Continous Integration and Deployment (CI/CD) part, Terraform script was used to provision an instance and Google Cloud Platform(GCP) was the platform for deployment.

### To get started:
* Clone and set up the project on your local machine

```git clone https://github.com/OyinOlamide/pastebin-clone.git```

<details>
<summary>Continous Integration</summary>
<br>
 
* Cd into the project directory, preferably using an IDE and add a file `.circleci` with the configuration below


 ```version: 2.1
orbs:
  node: circleci/node@3.0.0
jobs:
  build-and-test:
    executor:
      name: node/default
    steps:
      - checkout
      - node/install-packages
      - run:
          command: npm run test
workflows:
  build-and-test:
    jobs:
      - build-and-test
 ```

* Or visit <https://circleci.com/> ,register and set up the project. Create your YAML config file and put in the content above.

* Save and run it to build your pipeline.
 
</details>


<details>
<summary>Set up GCP account</summary>
<br>

* Setting up a GCP account is easy and can be done at <https://console.cloud.google.com/>
 
* After setting up your account, create a project

* Create a service account under your project

* Enable and download the json key
</details>


<details>
<summary>Provisioning with Terraform</summary>
<br>

* Install Terraform on your machine, visit https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started

* Provision your GCP resources by inputing the code below to your terraform configuration file

 ```
 terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

provider "google" {
  credentials = file("/mnt/c/Users/user/Downloads/scaf-330523-bc603d8fef19.json")

  project = "scaf-330523"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_compute_network" "vpc_network" {
  name = "terraform-networks"
}

resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }

  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
    }
  }
}
```

* Set up and apply changes
 
 initialize directory
 ```
 terraform init
 ```
 
Format configuration
 ```
 terraform fmt
 ```
 
Validate configuration
```
 terraform validate
 ```
 
Apply configuration, this is where the GCP resources would be created using Terraform
```
 terraform apply
```
At this point, your resources have been created and should reflect in your Google console.
</details>

<details>
<summary>Continous Deployment</summary>
<br>
To set up CD, you will go back to CircleCI to edit your config file.
 
</details>



## Technologies

* Language
  * TypeScript: <https://www.typescriptlang.org/docs/>

* Web Framework
  * NestJS: <https://docs.nestjs.com/>

* Database ORM
  * TypeORM: <https://typeorm.io/>

* Authentication
  * JWT: <https://jwt.io/>

* Linter
  * ESLint: <https://eslint.org/>

* Formatter
  * Prettier: <https://prettier.io/>

* Test
  * Jest: <https://jestjs.io/>

* Documentation
  * Compodoc: <https://compodoc.app/>

* Documentation OpenAPI
  * OpenAPI: <https://www.openapis.org/>
  * Swagger UI: <https://swagger.io/tools/swagger-ui/>

## Installation

Ensure that the nest-cli is installed globally

```shell
npm i -g @nestjs/cli
```

### Docker development

```shell
cp .env.example .env
docker-compose up -d
```

### Running the app without Docker

```shell
cp .env.example .env

# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```shell
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## DB migration

To run migrations, SSH into the app container with `docker-compose exec app bash` (ignore if not Docker). Then run any of the below commands


```shell
# generate
npm run migration:generate <name>

# show all migrations
npm run migration:show

# run
npm run migration:run

# dry run
npm run schema:log

# revert
npm run migration:revert
```

## Documentation

```shell
npm run doc
```

When the app is up and running, Swagger API documentation is available at the `/swagger` route

> A Postman collection is available at [Pastebin-Clone-Collection](https://www.getpostman.com/collections/e93dcbd398a47ca9dd10)
