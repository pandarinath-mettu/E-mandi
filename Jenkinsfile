

pipeline {

  agent any

  stages {

    stage('Clone Repository') {

      steps {

        git branch: 'main', url: 'https://github.com/pandarinath-mettu/E-mandi.git'

      }

    }

    stage('Install Dependencies') {

      steps {

        bat 'npm install'

      }

    }

    stage('Run Tests') {

      steps {

        bat 'npm test -- --watchAll=false --passWithNoTests'

      }

    }

    stage('Build React App') {

      steps {

        bat 'set CI=false && npm run build'

      }

    }

    stage('Build Docker Image') {

      steps {

        bat 'docker build -t emandi-react-app .'

      }

    }

    stage('Run Docker Container') {

      steps {

        bat 'docker run -d -p 3000:80 emandi-react-app'

      }

    }

  }

  post {

    always {

      echo 'Pipeline execution finished.'

    }

  }

}















