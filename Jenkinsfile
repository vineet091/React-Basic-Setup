pipeline {
   agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
   }
   environment {
       AWS_DEFAULT_REGION="us-east-2"
       CI = 'true' 
   }

    stages {
        stage('Check-AWS-Instance') {
            steps{

                withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'vin-aws-cred', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh 'aws --version'
                    sh 'aws ec2 describe-instances'
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm build'
            }
        }
    }
}
