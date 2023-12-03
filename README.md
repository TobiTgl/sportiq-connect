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
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/Nick Nowak/cloud-project/build.yml">
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
