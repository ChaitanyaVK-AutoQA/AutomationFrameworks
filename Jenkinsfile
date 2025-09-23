pipeline {
    agent any

    tools {
        maven 'Maven3'   // configure this in Jenkins -> Global Tool Configuration
        jdk 'JDK17'      // configure this in Jenkins -> Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ChaitanyaVK-AutoQA/AutomationFrameworks.git'
            }
        }

        stage('Build') {
            steps {
                bat 'mvn clean install -DskipTests'
            }
        }

        stage('Test') {
            steps {
                bat 'mvn test'
            }
        }
    }
}
