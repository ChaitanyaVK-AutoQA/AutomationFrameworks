pipeline {
    agent any

    tools {
        nodejs 'Node16'   // Name of NodeJS tool you configure in Jenkins Global Tool Configuration
    }

    environment {
        // Optional: set environment variables for Playwright
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '1' // if you already have browsers installed
    }

    stages {

        stage('Checkout') {
            steps {
                // Checkout code from GitHub
                git branch: 'main', url: 'https://github.com/ChaitanyaVK-AutoQA/AutomationFrameworks.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install npm packages
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Download browsers if needed
                bat 'npx playwright install'
            }
        }

        stage('Run Cucumber + Playwright Tests') {
            steps {
                // Run tests (update if you have a custom command)
                bat 'npx cucumber-js'  
                // or if you are using Playwright test runner:
                // bat 'npx playwright test'
            }
        }

        stage('Publish Test Reports') {
            steps {
                // If you generate HTML reports, archive them
                archiveArtifacts artifacts: 'reports/**/*.html', allowEmptyArchive: true

                // Optional: JUnit XML reports
                junit 'reports/**/*.xml'
            }
        }
    }

    post {
        always {
            // Clean workspace after build (optional)
            cleanWs()
        }
    }
}
