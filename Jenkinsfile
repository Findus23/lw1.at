pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('yarn install') {
      steps {
        sh 'yarn install --pure-lockfile'
      }
    }
    stage('build') {
      steps {
        sh 'yarn run build'
      }
    }
  }
}