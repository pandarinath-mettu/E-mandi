pipeline {
    agent any

    environment {
        IMAGE_NAME = "emandi-react-app"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Cloning from GitHub main branch
                git branch: 'main', url: 'https://github.com/pandarinath-mettu/E-mandi.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm packages (React app)
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (non-watch mode)
                bat 'npm test -- --watchAll=false --passWithNoTests'
            }
        }

        stage('Build React App') {
            steps {
                // Build the React application
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image using the Dockerfile
                bat "docker build -t %IMAGE_NAME% ."
            }
        }

        stage('Run Docker Container') {
            steps {
                // Run the Docker container and map port 3000 to 80
                bat "docker run -d -p 3000:80 %IMAGE_NAME%"
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
