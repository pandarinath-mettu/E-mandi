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
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME ."
            }
        }

        stage('Run Docker Container') {
            steps {
                sh "docker run -d -p 3000:80 $IMAGE_NAME"
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
