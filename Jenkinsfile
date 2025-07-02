// Jenkinsfile

pipeline {
    agent any

    environment {
        IMAGE_NAME = "emandi-react-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/pandarinath-mettu/E-mandi.git' // REPLACE with your repo
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test -- --watchAll=false'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Docker Container') {
            steps {
                bat "docker run -d -p 3000:80 $IMAGE_NAME"
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
