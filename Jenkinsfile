pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('yarn install') {
      steps {
        sh 'yarn install --pure-lockfile --ignore-engines'
      }
    }
    stage('build') {
      environment {
        PRERENDER = 'disabled'
      }
      steps {
        sh 'yarn run build'
      }
    }
  }
}