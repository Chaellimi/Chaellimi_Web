properties([
    pipelineTriggers([
        githubPush(),
        [
            $class: 'GitHubPRTrigger',
            spec: 'H/5 * * * *',
            triggerMode: 'HEAVY_HOOKS',
            events: [
                [$class: 'GitHubPRCommentEvent'],
                [$class: 'GitHubPROpenEvent'],
                [$class: 'GitHubPRCommitEvent']
            ]
        ]
    ])
])

pipeline {
    agent any
    
    tools {
        nodejs "NodeJs(22.13.0)"
    }

    environment {
        GITHUB_CREDS = credentials('github-token')
        DB_HOST = credentials('DB_HOST')
        DB_PORT = credentials('DB_PORT')
        DB_USER = credentials('DB_USER')
        DB_PASSWORD = credentials('DB_PASSWORD')
        DB_NAME = credentials('DB_NAME')
        DEV_TYPE = credentials('DEV_TYPE')
        GOOGLE_CLIENT_ID = credentials('GOOGLE_CLIENT_ID')
        GOOGLE_CLIENT_SECRET = credentials('GOOGLE_CLIENT_SECRET')
        NEXTAUTH_SECRET = credentials('NEXTAUTH_SECRET')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                sh 'npm install -g yarn'
            }
        }

        stage('Load Environment') {
            steps {
                sh """
                    echo "DB_HOST=$DB_HOST" >> .env
                    echo "DB_PORT=$DB_PORT" >> .env
                    echo "DB_USER=$DB_USER" >> .env
                    echo "DB_PASSWORD=$DB_PASSWORD" >> .env
                    echo "DB_NAME=$DB_NAME" >> .env
                    echo "GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID" >> .env
                    echo "GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET" >> .env
                    echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET" >> .env
                """
            }
        }


        stage('Build & Test') {
            when {
                anyOf {
                    expression { env.CHANGE_ID != null }
                    expression { env.CHANGE_TARGET != null && env.CHANGE_BRANCH != null }
                    expression { env.BRANCH_NAME =~ /^feat\/.*/ }
                    expression { env.BRANCH_NAME =~ /^hotfix\/.*/ }
                    expression { env.BRANCH_NAME =~ /^develop\/.*/ }
                }
            }
            steps {
                script {
                    sh 'yarn install --frozen-lockfile'
                    sh 'yarn build'
                    
                    if (env.CHANGE_ID) {
                        echo "Processing PR #${env.CHANGE_ID}"
                    }
                }
            }
        }
        
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh 'docker build -t chaellimi .'
                sh 'docker stop chaellimi || true'
                sh 'docker rm chaellimi || true'
                sh 'docker run -d --name chaellimi -p 4001:3000 chaellimi'
                sh 'sudo systemctl restart nginx'
            }
        }
    }
    
    post {
        success {
            publishChecks name: 'default',
            title: 'Pipeline Check',
            summary: 'Build succeeded',
            text: 'All stages completed successfully',
            status: 'COMPLETED',
            conclusion: 'SUCCESS',
            detailsURL: env.BUILD_URL,
            actions: [],
            annotations: []
        }
        failure {
            publishChecks name: 'default',
            title: 'Pipeline Check',
            summary: 'Build failed',
            text: 'Check pipeline logs for details',
            status: 'COMPLETED',
            conclusion: 'FAILURE'
        }
    }
}
