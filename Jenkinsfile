pipeline {
	agent any
	stages {
		stage('Build Info') {
		    steps {
			echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
		    }
		}
		stage('Build and Test Image') {
		    steps {
			sh "docker build -f Dockerfile -t periferiafactory/catalogo:v$BUILD_NUMBER ."
		    }
		}
		stage('Push Image') {
			steps {
				withDockerRegistry([ credentialsId: "docker", url: "" ]) {
					sh 'docker push periferiafactory/catalogo:v$BUILD_NUMBER'
				}
			}
	    	}
		stage('K8 Update') {
			steps {
				sh 'kubectl -n demo-ath  --record deployment.apps/catalogo-deployment set image deployment.v1.apps/catalogo-deployment catalogo=periferiafactory/catalogo:v$BUILD_NUMBER'
			}
		}
	}
}
