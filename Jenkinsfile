pipeline {
    agent any
    stages{
        stage('Checkout') {
            steps{
                echo "------------>Checkout<------------"
                checkout scm
            }
        }
        stage('NPM Install') {
            steps {
                echo '------------>Installing<------------'
                sh 'npm install'
            }
        }
        stage('Unit Test') {
            steps {
                echo '------------>Testing<------------'
                sh 'npm run test'
            }
        }
        stage('Test end-to-end') {
            steps {
                echo '------------>Testing Protractor<------------'
                sh 'npm run e2e'
            }
        }
        stage('Static Code Analysis') {
            steps{
                echo '------------>Análisis de código estático<------------'
                withSonarQubeEnv('Sonar') {
                    sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner"
                }
            }
        }

        stage('Build') {
            steps {
                echo "------------>Building<------------"
                sh 'npm run build'
            }
        }
    } 
}