pipeline {
    agent any

    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
        REPORTS_DIR = 'reports'
        DASHBOARD_DIR = 'reports\\dashboard'
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 60, unit: 'MINUTES')
    }

    tools {
        nodejs 'Node24' // Name of NodeJS installation configured in Jenkins Global Tool Configuration
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
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo "Installing Playwright browsers..."
                bat 'npx playwright install'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                echo "Running Cucumber tests..."
                bat """
                npx cucumber-js --format html:${REPORTS_DIR}\\cucumber.html --format junit:${REPORTS_DIR}\\cucumber-results.xml
                """
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo "Running Playwright tests..."
                bat """
                npx playwright test --retries=2 --reporter=html --output=${REPORTS_DIR}\\playwright\\ --reporter=junit
                """
            }
        }

        stage('Generate Unified Dashboard') {
            steps {
                echo "Generating unified HTML dashboard..."
                script {
                    // Safe folder creation for Windows
                    bat "if not exist ${DASHBOARD_DIR} mkdir ${DASHBOARD_DIR}"

                    // Copy Cucumber report
                    bat "copy ${REPORTS_DIR}\\cucumber.html ${DASHBOARD_DIR}\\cucumber.html"

                    // Copy Playwright report folder recursively
                    bat "xcopy ${REPORTS_DIR}\\playwright\\* ${DASHBOARD_DIR}\\playwright\\ /s /e /y"

                    // Write unified index.html
                    writeFile file: "${DASHBOARD_DIR}\\index.html", text: """
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
                // JUnit reports
                junit "${REPORTS_DIR}\\**\\*.xml"

                // Archive HTML reports
                archiveArtifacts artifacts: "${REPORTS_DIR}\\**\\*.html", allowEmptyArchive: true

                // Publish unified dashboard
                publishHTML(target: [
                    reportDir: "${DASHBOARD_DIR}",
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
            // Preserve reports folder while cleaning other files
            cleanWs(deleteDirs: true, patterns: [[pattern: "!${REPORTS_DIR}\\**"]])
        }
    }
}
