@Library('ceiba-jenkins-library') _

pipeline{
	
		agent any
	
        
		
		stages{
		
			stage('Checkout') {
				steps {
                echo '------------>Checkout desde Git Microservicio<------------'
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], gitTool: 'Default' , submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GitHub_mauricioolarte', url: 'https://github.com/mauricioolarte/rent_car']]])
				}
			}
		
		
			stage('compilar '){
                steps {
                    sh 'npm i'
                    sh 'npm run build'					
				}
            }
            stage('test '){
                steps {
                    sh 'npm run test:cov'					
				}
            }

			stage('test e2e'){
                steps {
                    sh 'npm run test:e2e'					
				}
            }

			
			stage('Static Code Analysis') {
    			steps{
        			sonarqubeMasQualityGatesP(sonarKey:'co.com.ceiba.adn:rentcar-mauricio.olarte', 
        			sonarName:'CeibaADN-RentCar(mauricio.olarte)', 
        			sonarPathProperties:'./sonar-project.properties')
    			}
			} 
		}
		post {
			failure {
				mail(to: 'mauricio.olarte@ceiba.com.co',
				body:"Build failed in Jenkins: Project: ${env.JOB_NAME} Build /n Number: ${env.BUILD_NUMBER} URL de build: ${env.BUILD_NUMBER}/n/nPlease go to ${env.BUILD_URL} and verify the build",
				subject: "ERROR CI: ${env.JOB_NAME}")
			}
		}
		success {
			echo 'This will run only if successful'
			junit 'build/test-results/test/*.xml' //RUTA DE TUS ARCHIVOS .XML
		}
	
			
}