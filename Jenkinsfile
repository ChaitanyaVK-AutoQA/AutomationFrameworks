pipeline {
    agent any

    environment {
        PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = '0'
        REPORTS_DIR = 'reports'
        DASHBOARD_DIR = 'reports/dashboard'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ChaitanyaVK-AutoQA/AutomationFrameworks.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                bat """
                npx cucumber-js --format html:${REPORTS_DIR}/cucumber.html --format junit:${REPORTS_DIR}/cucumber-results.xml
                """
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat """
                npx playwright test --retries=2 --reporter=html --output=${REPORTS_DIR}/playwright/ --reporter=junit
                """
            }
        }

        stage('Generate Unified Dashboard') {
            steps {
                script {
                    // Create dashboard folder
                    bat "mkdir ${DASHBOARD_DIR}"

                    // Copy individual reports into dashboard folder
                    bat "copy ${REPORTS_DIR}\\cucumber.html ${DASHBOARD_DIR}\\cucumber.html"
                    bat "xcopy ${REPORTS_DIR}\\playwright\\* ${DASHBOARD_DIR}\\playwright\\ /s /e /y"

                    // Create index.html linking both reports
                    writeFile file: "${DASHBOARD_DIR}/index.html", text: """
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

        stage('Publish Unified Dashboard') {
            steps {
                // Archive HTML dashboard
                archiveArtifacts artifacts: "${DASHBOARD_DIR}/**", allowEmptyArchive: true

                // Publish dashboard in Jenkins UI
                publishHTML(target: [
                    reportDir: "${DASHBOARD_DIR}",
                    reportFiles: 'index.html',
                    reportName: 'Unified Test Dashboard',
                    allowMissing: true,
                    alwaysLinkToLastBuild: true
                ])

                // Archive JUnit XMLs for trends
                junit 'reports/**/*.xml'
            }
        }
    }

    post {
        always {
            cleanWs(deleteDirs: true, patterns: ["!${REPORTS_DIR}/**"])
        }
    }
}
