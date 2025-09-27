pipeline {
    agent any

    environment {
        DOCKER_HOST = 'tcp://localhost:2375'      // LocalSystem Docker access
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
        REPORTS_DIR = 'reports'
        DASHBOARD_DIR = 'reports/dashboard'
        PLAYWRIGHT_REPORT_DIR = "${DASHBOARD_DIR}/playwright"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 60, unit: 'MINUTES')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Checking out code..."
                git branch: 'main', url: 'https://github.com/ChaitanyaVK-AutoQA/AutomationFrameworks.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing npm dependencies..."
                bat 'npm ci'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                echo "Running Cucumber tests..."
                bat "npx cucumber-js --format html:%REPORTS_DIR%\\cucumber.html --format junit:%REPORTS_DIR%\\cucumber-results.xml"
            }
        }

        stage('Run Playwright Tests via Docker Compose') {
            steps {
                echo "Running Playwright tests via Docker Compose..."
                bat '''
                docker-compose up --build --abort-on-container-exit
                docker-compose down
                '''
            }
        }

        stage('Prepare Unified Dashboard') {
            steps {
                echo "Preparing unified dashboard..."
                script {
                    // Create dashboard directories
                    bat "mkdir %PLAYWRIGHT_REPORT_DIR%"

                    // Copy Playwright reports from container output
                    bat "xcopy %REPORTS_DIR%\\playwright\\* %PLAYWRIGHT_REPORT_DIR%\\ /s /e /y"

                    // Copy Cucumber report
                    bat "copy %REPORTS_DIR%\\cucumber.html %DASHBOARD_DIR%\\cucumber.html"

                    // Generate unified index.html
                    writeFile file: "%DASHBOARD_DIR%\\index.html", text: """
                    <html>
                        <head><title>Unified Test Dashboard</title></head>
                        <body>
                            <h1>Test Dashboard</h1>
                            <ul>
                                <li><a href="cucumber.html" target="_blank">Cucumber Report</a></li>
                                <li><a href="playwright/index.html" target="_blank">Playwright Report</a></li>
                            </ul>
                        </body>
                    </html>
                    """
                }
            }
        }

        stage('Archive & Publish Reports') {
            steps {
                echo "Archiving and publishing reports..."
                junit 'reports/**/*.xml'

                archiveArtifacts artifacts: 'reports/**/*.html', allowEmptyArchive: true

                publishHTML(target: [
                    reportDir: "%DASHBOARD_DIR%",
                    reportFiles: 'index.html',
                    reportName: 'Unified Test Dashboard',
                    allowMissing: true,
                    alwaysLinkToLastBuild: true
                ])
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
    }
}
