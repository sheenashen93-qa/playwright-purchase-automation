pipeline {
    agent { label 'mac-local' }

    tools {
        nodejs 'Node24'
    }

    options {
        skipDefaultCheckout()
    }

    environment {
        CI = 'true'
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'playwright-results.xml'
    }

    stages {
        stage('Checkout') {
            steps {
                dir("build-${env.BUILD_NUMBER}") {
                    git branch: 'main',
                        url: 'https://github.com/sheenashen93-qa/playwright-purchase-automation'
                }
            }
        }

        stage('Install dependencies') {
            steps {
                dir("build-${env.BUILD_NUMBER}") {
                    sh '''
                        node --version
                        npm --version
                        npm ci
                        npx playwright install chromium
                    '''
                }
            }
        }

        stage('Run UI tests') {
            steps {
                dir("build-${env.BUILD_NUMBER}") {
                    sh 'npx playwright test "tests/UI" --project=chromium --reporter=list,junit'
                }
            }

            post {
                always {
                    junit testResults: "build-${env.BUILD_NUMBER}/playwright-results.xml"
                }
            }
        }

        stage('Run API tests') {
            steps {
                dir("build-${env.BUILD_NUMBER}") {
                    sh 'npx playwright test "tests/API" --reporter=list,junit'
                }
            }

            post {
                always {
                    junit testResults: "build-${env.BUILD_NUMBER}/playwright-results.xml"
                }
            }
        }

        stage('Run WorkFlow tests') {
            steps {
                dir("build-${env.BUILD_NUMBER}") {
                    sh 'npx playwright test "tests/WorkFlow" --project=chromium --reporter=list,junit'
                }
            }

            post {
                always {
                    junit testResults: "build-${env.BUILD_NUMBER}/playwright-results.xml"
                }
            }
        }
    }
}