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


 ```
 # The CircleCI version you want to use must be specified in all Circle CI config files
 
 version: 2.1

# Orbs are reusable packages of config elements. They make CI/CD easier
# Here we use the orbs to create a Node JS workflow
 
orbs:
  node: circleci/node@3.0.0

 # Jobs are a collection of steps that runs the build process. In theh jobs block, the processes are defined.
 
 jobs:
  build-and-test:
    executor:
      name: node/default
 
 # Steps are a collection of executable commands which run during a job. Several keys are nested under thsi block, so here we define the steps/commands for creating the workflow.
 # The checkout and run keys are required to checkout the code and for this configuration to actually run.
 
    steps:
      - checkout
      - node/install-packages
      - run:
          command: npm run test

# The workflows block below runs whatever job you specify and the workflow will run across all your commits.
 
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

* Enable and download the json key for the service account.
</details>


<details>
<summary>Provisioning with Terraform</summary>
<br>

* Install Terraform on your machine, visit https://learn.hashicorp.com/tutorials/terraform/install-cli?in=terraform/gcp-get-started

* Provision your GCP resources by inputing the code below to your terraform configuration file

 ```
 # This Terraform block contains the necessary settings for Terraform. It specifies the providers Terraform will provision resources from. You may also include the latest version, however this is optional.
 
 terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.5.0"
    }
  }
}

# Provider's block - specifies the provider (Google in this case), that Terraform uses to create and manage the resources.
 
provider "google" {
 
 # The credentials should contain the path or directory to your already downloaded GCP service account JSON key
 
  credentials = file("/mnt/c/Users/user/Downloads/scaf-330523-bc603d8fef19.json")

  project = "scaf-330523"
  region  = "us-central1"
  zone    = "us-central1-c"
}

 
# The resource block defines components of the infrastructure, the arguments needed to configure the resource.
 
resource "google_compute_network" "vpc_network" {
  name = "terraform-networks"
}

resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "f1-micro"

  boot_disk {
    initialize_params {
 
#The operating system connected to the resources
 
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
 
 Initialize directory
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

Inspect the state of the resources
```
terraform show
 ```
 
At this point, your resources have been created and should reflect in your Google console.
</details>


<details>
<summary>Heroku Setup</summary>
<br>
 
* Create an account on [Heroku](https://www.heroku.com)
 
* Create a new app
 
* Copy your account API key
</details>


<details>
<summary>Continous Deployment</summary>
<br> 
To set up CD, you will go back to CircleCI to edit your config file and create two environment variables.

* Create an environment variable with `HEROKU_APP_NAME` in the name section, and input your Heroku app name as the value.

* Create another environment variable with `HEROKU_API_KEY` as name and you previously copied API key as the value.

Now, you can go ahead to edit your CircleCI configuration file, either on CircleCI or via your preferred IDE.

* Edit the file in the orbs block and the workflows block to include the provider you want, in this case, Heroku.

* Update the entire configuration with the one below.
 ```
 version: 2.1
orbs:
  node: circleci/node@3.0.0
  heroku: circleci/heroku@0.0.10
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
  heroku_deploy:
    jobs:
      - heroku/deploy-via-git
 ```
 
After running this successfully, you can go back to the app created on your Heroku dashboard to see your app deployed.
 
</details>

<details>
<summary>References</summary>
<br>
 
* Hashicorp terraform tutorials
 
 <https://learn.hashicorp.com/tutorials/terraform/google-cloud-platform-build?in=terraform/gcp-get-started/>
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
