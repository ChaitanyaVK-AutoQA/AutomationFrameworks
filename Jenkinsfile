pipeline {
    agent any

    tools {
        maven 'Maven3'   // configure Maven in Jenkins (Global Tool Configuration)
        jdk 'JDK11'      // configure JDK in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ChaitanyaVK-AutoQA/AutomationFrameworks.git'
            }
        }

        stage('Build') {
            steps {
                sh "mvn clean compile"
            }
        }

        stage('Run Tests') {
            steps {
                sh "mvn test"
            }
        }

        stage('Archive Reports') {
            steps {
                junit '**/target/surefire-reports/*.xml'
                archiveArtifacts artifacts: 'target/**/*.html', allowEmptyArchive: true
            }
        }
    }
}
